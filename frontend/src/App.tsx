import { useState } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu,Card, theme } from "antd";
import logo from "./assets/logo.png";
import "./t.css";

import Order from "./pages/orderboard";

// import History from "./pages/history";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("SoyJuu's Order", "1", <ShoppingCartOutlined />),
  getItem("SoyJuu's History", "2", <HistoryOutlined />),
];

const App: React.FC = () => {
  const page = localStorage.getItem("page");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="sider"
          
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "40%", borderRadius: "50%" }}
            />
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={[page ? page : "orderboard"]}
            mode="inline"
          >
            <Menu.Item key="orderboard" onClick={() => setCurrentPage("orderboard")}>
              <Link to="/">
                <ShoppingCartOutlined />

                <span>SoyJuu's Order</span>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="history" onClick={() => setCurrentPage("history")}>
              <Link to="/history">
                <UserOutlined />
                <span>SoyJuu's History</span>
              </Link>
            </Menu.Item> */}
          {/* </Menu>
        </Sider> */} 
        <Layout>
          <Header className="sider" style={{ padding: 40, }} />
          <Content className="bo" >
            <Breadcrumb  />
            <div
              style={{
               
                minHeight: "100%",
                
              }}
            >
              <Routes>
                <Route path="/" element={<Order />} />
                
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
