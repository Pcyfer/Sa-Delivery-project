import { useState, useEffect } from "react";
import { OrderInterface } from "../../../interfaces/IOrder";
import {
  DeleteOrderByID,
  GetOrders,
  UpdateOrder,
} from "../../../services/http";
import { message, Col, Divider, Modal, Row, Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { CheckOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FoodInterface } from "../../../interfaces/IFood";
import "./body.css";
function OrderFoods() {
  const columns: ColumnsType<OrderInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "รายการที่",
      dataIndex: "OrderID",
      key: "orderid",
    },
    {
      title: "เมนู",
      dataIndex: "FoodID",
      key: "foodid",
    },
  ];

  const [order, setOrder] = useState<FoodInterface>();
  const onFinish = async (values: FoodInterface) => {
    values.ID = order?.ID;
    let res = await UpdateOrder(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/customer");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "แก้ไขข้อมูลไม่สำเร็จ",
      });
    }
  };

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const [orderfoods, setOrderFoods] = useState<FoodInterface[]>([]);



 

  return (
    <>
      {contextHolder}
      <Row className="body">
        <Col span={12}>
          <h2>SoyJuu's Order Detail</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}></Col>
      </Row>
      <Divider />
      <div className="body" style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={orderfoods} />
      </div>
    </>
  );
}

export default OrderFoods;
