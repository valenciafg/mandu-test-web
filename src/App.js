import { Layout, Menu } from 'antd';
// import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import Division from './components/Division';
import { DivisionProvider } from './Context/division-context';
import './App.scss';
const { Header, Footer, Content } = Layout;


function App() {
  return (
    <Layout className="App">
      <Header>
        <Menu mode="horizontal">
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Organización</Menu.Item>
          <Menu.Item key="3">Modelos</Menu.Item>
          <Menu.Item key="4">Seguimiento</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <Division/>
      </Content>
      <Footer>
        <MainFooter/>
      </Footer>
    </Layout>
  );
}

export default () => <DivisionProvider>
  <App></App>
</DivisionProvider>;
