/*
 * @Author: zt zhoutao@ydmob.com
 * @Date: 2023-12-15 11:26:15
 * @LastEditors: zt zhoutao@ydmob.com
 * @LastEditTime: 2024-01-31 18:10:33
 * @FilePath: /client/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { } from 'react-router-dom'
import Layout from './pages/Movie/Layout/index';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/' component={Layout}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
