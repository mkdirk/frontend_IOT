import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { Order, Menu } from "../lib/models";
import Loading from "../components/loading";
import { Alert } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";


export default function BooksPage() {
  const { data: order, error } = useSWR<Order[]>("/staff");
  const { data: menus} = useSWR<Menu[]>("/menu");

  const menuMap = new Map<number, string>();
  if (menus) {
    menus.forEach(menu => menuMap.set(menu.id, menu.name));
  }

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">รายการเครื่องดื่มที่ลูกค้าสั่ง</h1>
          <h2>รายการทั้งหมด</h2>
        </section>

        <section className="container mx-auto py-8">
          <div className="flex justify-between">
            <h1>รายการเครื่องดื่ม</h1>

           
          </div>

          {!order && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {order?.map((order) => (
              <div className="border border-solid border-neutral-200" key={order.id}>
                {/* <img
                  src="https://placehold.co/150x200"
                  alt={book.title}
                  className="w-full object-cover aspect-[3/4]"
                /> */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold line-clamp-2">{menuMap.get(order.order_id)}</h2>
                  <p className="text-xs text-neutral-500">จำนวนที่สั่ง {order.quantity}</p>
                  <p className="text-xs text-neutral-500">ราคารวม {order.total_price}</p>
                  <p className="text-xs text-neutral-500">หมายเหตุ {order.note}</p>
                </div>

                <div className="flex justify-end px-4 pb-2">
                  {/* <Button component={Link} to={`/books/${book.id}`} size="xs" variant="default">
                    ดูรายละเอียด
                  </Button> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
