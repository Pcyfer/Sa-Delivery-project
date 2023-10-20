import { useState, useEffect } from "react";
import { OrderInterface } from "../../interfaces/IOrder";
import { DeleteOrderByID, GetOrders, GetOrdersDetail, UpdateOrder } from "../../services/http";
import { message, Col, Divider, Modal, Row, Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { CheckOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { OrderDetailInterface } from "../../interfaces/IOrderDetail";
function Orders() {
  const columns: ColumnsType<OrderInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ผู้สั่งซื้อ",
      dataIndex: "StateID",
      key: "stateid",
    },
    // {
    //   title: "ที่อยู่จัดส่ง",
    //   dataIndex: "Address",
    //   key: "address",
    // },
    {
      title: "อาหาร",
      dataIndex: "FoodID",
      key: "foodid",
    },
    {
      title: "สถานะ",
      dataIndex: "StateID",
      key: "stateid",
    },
    
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<CheckOutlined />}
            size="large"
          />
        </>
      ),
    },
  ];

  const navigate = useNavigate();

  const [orders, setOrders] = useState<OrderInterface[]>([]);

  const [order, setOrder] = useState<OrderInterface>();

  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getOrders = async () => {
    let res = await GetOrders();
    if (res) {
      setOrders(res);
    }
  };

  const showModal = (val: OrderInterface) => {
    setModalText(`ต้องการรับออร์เดอร์ "${val.ID}" หรือไม่`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteOrderByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "รับออร์เดอร์สำเร็จ",
      });
      getOrders();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {contextHolder}
      <Row className="body">
        <Col span={12}>
          <h2>SoyJuu's Order</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}></Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={orders} />
      </div>
      <Modal
        title="รับออร์เดอร์ ?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}

export default Orders;
