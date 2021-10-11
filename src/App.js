import Main from "./main/Main";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Detail from "./detail/Detail";
import { createContext, useState } from "react";
import Login from "./login/Login";
import AuthRoute from "./Auth";
import axios from 'axios';
import { CookiesProvider } from "react-cookie";
export const NameListContext = createContext();
export const IsModalOpenContext = createContext();
export const SelectedStudentContext = createContext();
export const InputsContext = createContext();
export const IsLoginedContext = createContext();
export const modifiedEmailContext = createContext();
export const TokenContext = createContext();
export const CommentListContext = createContext();

const dummyData = [{
  
  id: '',
  name: '',
  grade: '',
  profileImg: '',
  email: '',
  phone: '',
  major: '',
  locked: false
}];
const defaultInput = {
  id: '',
  name: '',
  grade: '',
  profileImg: '',
  email: '',
  phone: '',
  major: '',
  locked: false
};


function App() {
  const [nameList, setNameList]  = useState(dummyData);   /* dummydata 배열 */
  const [isModalOpen, setIsModalOpen] = useState(false);     
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [inputs, setInputs] = useState(defaultInput); /* detailView */
  const [isLogined, setIsLogined] = useState(false);
  const [modifiedEmail, setModifiedEmail ] = useState('');
  const [token, setToken] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const isAuthorized = localStorage.getItem("id") != null;
  return (
    <CookiesProvider>
    <CommentListContext.Provider value={{commentList, setCommentList}}>
    <NameListContext.Provider value={{nameList, setNameList}}> 
    <SelectedStudentContext.Provider value={{selectedStudent, setSelectedStudent}}>
    <IsModalOpenContext.Provider value={{isModalOpen, setIsModalOpen}}>
    <InputsContext.Provider value={{inputs, setInputs}}>
    <IsLoginedContext.Provider value={{isLogined, setIsLogined}}>
    <modifiedEmailContext.Provider value={{modifiedEmail, setModifiedEmail}}>
    <TokenContext.Provider value={{token, setToken}}>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact isLogined={isAuthorized} path={'/students'} render={props => <Main {...props} />}/>
          <AuthRoute exact isLogined={isAuthorized} path={'/students/:id'} render={props => <Detail {...props} />}/>
          <Route path={!isAuthorized? '/login' : '/students'} render={props => (
            <Login {...props}/>
          )} />
          <Redirect to={!isAuthorized? '/login' : '/students'}/>
        </Switch>
      </BrowserRouter>
    </TokenContext.Provider>
    </modifiedEmailContext.Provider>
    </IsLoginedContext.Provider>
    </InputsContext.Provider>
    </IsModalOpenContext.Provider>
    </SelectedStudentContext.Provider>
    </NameListContext.Provider>
    </CommentListContext.Provider>
    </CookiesProvider>
  )
}

export default App;
