import { Layout, Menu } from 'antd';
import Title from 'antd/lib/typography/Title';
import './MainHeader.scss';

const { Header } = Layout;

function MainHeader () {
    return (
        <Header>
            <Title className="header-title">Maundü</Title>
            <Menu mode="horizontal">
                <Menu.Item key="1">Dashboard</Menu.Item>
                <Menu.Item key="2">Organización</Menu.Item>
                <Menu.Item key="3">Modelos</Menu.Item>
                <Menu.Item key="4">Seguimiento</Menu.Item>
            </Menu>
        </Header>
    );
}

export default MainHeader;