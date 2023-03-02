import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap'
import '../App.css';
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";


function Detail(props) {

    let { id } = useParams();
    let 찾은상품 = props.shoes.find(function (x) {
        return x.id == id
    });
    let [alertsecond, setAlertsecond] = useState(true)
    let [num, setNum] = useState('');
    let [tab, setTap] = useState(0);
    let [fade2, setFade2] = useState('')
    let dispatch = useDispatch()

    useEffect(() => {
        if (isNaN(num)==true){
            alert('그러지마세요')
        }
    }, [num])

    useEffect(()=>{
        setFade2('end')
        return ()=>{
          setFade2('')
        }
      },[])

    return (
        <div className={'container start ' + fade2}>
            {
                alertsecond == true
                    ? <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                    : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + '/shoes' + (parseInt(id) + 1) + '.jpg'} width="80%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem( {id : 0, name : 'White and Black', count : 2} ))
                    }}>주문하기</button>
                </div>
            </div>

        <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
            <Nav.Link onClick={()=>{ setTap(0) }} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link onClick={()=>{ setTap(1) }} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link onClick={()=>{ setTap(2) }} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>            
        </Nav>
        <TabContent tab ={tab}></TabContent>
        </div>
    )
}

function TabContent(props){
    let [fade, setFade] = useState('')

    useEffect(()=>{
        setTimeout(()=>{ setFade('end') }, 100)
      return ()=>{
        setFade('')
      }
      }, [props.tab])

    return (
        <div className={"start " + fade}>
          { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab] }
        </div>
      )
}

export default Detail;