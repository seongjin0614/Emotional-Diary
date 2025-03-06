import './App.css'
import { useReducer, useRef, createContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'


const mockData = [
  { 
    id: 1,
    createdData: new Date().getTime(),
    emotionId: 1,
    content: '1번 일기 내용'
  },
  { 
    id: 2,
    createdData: new Date().getTime(),
    emotionId: 2,
    content: '2번 일기 내용'
  },
];



function reducer(state, action) {
  switch(action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item)=> String(item.id) === String(action.data.id) 
        ? action.data
        : item);
    case 'DELETE':
      return state.filter((item)=> String(item.id) !== String(action.data.id));
    default:
      return state;
  }
}

const DiaryContext = createContext();
const DiaryDispatchContext = createContext();


function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRdf = useRef(3);

  // 새로운 일기 추가
  const onCreate = (createdData, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRdf.current++,
        createdData,
        emotionId,
        content
      }
    })
  }

  // 기존 일기 수정
  const onUpdate = (id, createdData, emotionId, content)=> {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdData,
        emotionId,
        content
      }
    })
  }

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      data: {
        id
      }
    })
  }




  return (
    <>
      <DiaryContext.Provider value={{data}}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryContext.Provider>
    </>

  )
}

export default App
