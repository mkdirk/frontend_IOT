import { Alert, Badge, Button, Container, Divider } from "@mantine/core";
import Layout from "../components/layout";
import { Link, useParams } from "react-router-dom";
import { NumberInput, TextInput } from "@mantine/core";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconEdit } from "@tabler/icons-react";
import { Menu } from "../lib/models";

export default function MenuByIdPage() {
  const { menuId } = useParams();

  const { data: menu, isLoading, error } = useSWR<Menu>(`/menu/${menuId}`);

  return (
    <>
      <Layout>
        <Container className="mt-4">
          {/* You can use isLoading instead of !book */}
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
              <p className="italic text-neutral-500 mb-4">{menu.price}</p>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <NumberInput
                    label="จำนวนแก้วที่ต้องการสั่ง"
                    placeholder="ขั้นต่ำ 1"
                    min={1}
                />
                <TextInput
                    label="หมายเหตุ"
                    placeholder="หมายเหตุ"
                />
                
              </div>

              <Divider className="mt-4" />

                < Button
                    color="green"
                    size="s"
                    component={Link}
                    to={`/menu/${menu.id}/edit`}
                    className="mt-4"
                    leftSection={<IconEdit />}
                >
                    สั่งเลย!
                </Button>
              {/* <Button
                color="blue"
                size="xs"
                component={Link}
                to={`/books/${book.id}/edit`}
                className="mt-4"
                leftSection={<IconEdit />}
              >
                แก้ไขข้อมูลหนังสือ
              </Button> */}
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
