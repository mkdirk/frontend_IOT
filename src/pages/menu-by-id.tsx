import { Alert, Button, Container, Divider, Modal, NumberInput, TextInput } from "@mantine/core";
import Layout from "../components/layout";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconEdit } from "@tabler/icons-react";
import { Menu } from "../lib/models";
import axios from "axios";
import { useState } from "react";

export default function MenuByIdPage() {
  const { menuId } = useParams();
  const { data: menu, error } = useSWR<Menu>(`/menu/${menuId}`);
  const [quantity, setQuantity] = useState<number | undefined>(1);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Send the data to the server
      const response = await axios.post(`/order`, {
        menuId,
        quantity,
        note
      });
      console.log(response)
      // Show success message
      setModalMessage("Order placed successfully!");
    } catch (error) {
      // Show error message
      console.log(error)
      setModalMessage("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
      setModalOpened(true);
    }
  };

  return (
    <>
      <Layout>
        <Container className="mt-4">
          {isLoading && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          {!!menu && (
            <>
              <h1>{menu.name}</h1>
              <p className="italic text-neutral-500 mb-4">ราคาแก้วละ {menu.price}</p>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <NumberInput
                  label="จำนวนแก้วที่ต้องการสั่ง"
                  placeholder="ขั้นต่ำ 1"
                  min={1}
                  value={quantity}
                  onChange={(value) => {
                    // Convert value to number if it is a string
                    setQuantity(typeof value === 'number' ? value : parseFloat(value) || undefined);
                  }}
                />
                <TextInput
                  label="หมายเหตุ"
                  placeholder="หมายเหตุ"
                  value={note}
                  onChange={(event) => setNote(event.currentTarget.value)}
                />
              </div>

              <Divider className="mt-4" />

              <Button
                color="green"
                size="s"
                onClick={handleSubmit}
                className="mt-4"
                leftSection={<IconEdit />}
                disabled={isLoading}
              >
                สั่งเลย!
              </Button>
            </>
          )}
        </Container>
      </Layout>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Order Status"
      >
        {modalMessage}
      </Modal>
    </>
  );
}
