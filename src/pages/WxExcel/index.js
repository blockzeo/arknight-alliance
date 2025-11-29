import { useEffect, useState } from 'react';
import { Table, Card,  Button } from 'antd';
import data from './data';
import './index.css';

const check_Keys = ["核心盟约1", "核心盟约2","附加盟约1","附加盟约2","字段"]
const columns = [
    {
        title: "阶数",
        key:  "阶数",
        dataIndex:  "阶数",
    },{
        title: "核心盟约1",
        key:  "核心盟约1",
        dataIndex:  "核心盟约1",
    },{
        title: "核心盟约2",
        key:  "核心盟约2",
        dataIndex:  "核心盟约2",
    },{
        title: "干员名",
        key:  "干员名",
        dataIndex:  "干员名",            
    },{
        title: "附加盟约1",
        key:  "附加盟约1",
        dataIndex:  "附加盟约1",
    },{
        title: "附加盟约2",
        key:  "附加盟约2",
        dataIndex:  "附加盟约2",
    },{
        title: "特质类型",
        key:  "特质类型",
        dataIndex:  "特质类型",
    },{
        title: "特质描述",
        key:  "特质描述",
        dataIndex:  "特质描述",
    },{
        title: "字段",
        key:  "字段",
        dataIndex:  "字段",
    },
];


function App() {
    const [originList, setOriginList] = useState([]); // 原始数据列表
    const [selectList, setSelectList] = useState([]); // 筛选后列表
    const [hxmy, setHxmy] = useState([]); //核心盟约筛选
    const [my, setMy] = useState([]); //附加筛选
    const [zd, setZd] = useState([]); //字段筛选
    const [selectOne, setSelectOne] = useState({}); //选择干员
    const [activeFilter, setActiveFilter] = useState([]); //筛选项

    
    const selectOneS = (item) => {
        setSelectOne(item)
    }

    const handleFilterChange = (filterTag) => {
        const newFilter = [...activeFilter];
        if(newFilter.includes(filterTag)){
            setActiveFilter(newFilter.filter(item => item !== filterTag));
        } else {
            newFilter.push(filterTag)
            setActiveFilter(newFilter);
        }
    }

    useEffect(() => {
        const filterHxmy = [];
        const filtermy = [];
        const filterzd = [];
        const processList = data.map((item, index) => {
            const filterTag = [];

            
            const my = [];
            const zd = [];
            check_Keys.forEach((key) => {
                item[key] && filterTag.push(item[key]);
                if(key !== "字段" && item[key]){
                    my.push(item[key])
                } else {
                    zd.push(item[key])
                }
                if(key === "核心盟约1" || key === "核心盟约2"){
                    if(item[key] && !filterHxmy.includes(item[key])){
                        filterHxmy.push(item[key]);
                    }   
                }
                if(key === "附加盟约1" || key === "附加盟约2"){
                    if(item[key] && !filtermy.includes(item[key])){
                        filtermy.push(item[key]);
                    }
                }
                if(key === "字段"){
                    if(item[key] && !filterzd.includes(item[key])){
                        filterzd.push(item[key]);
                    } 
                }  
            });
            filterTag.push(item["阶数"]);
            setHxmy(filterHxmy);
            setMy(filtermy);
            setZd(filterzd);
            return {
                key: index,
                level: item["阶数"],
                name: item["干员名"],
                coreCovenant1: item["核心盟约1"],
                coreCovenant2: item["核心盟约2"],
                covenant1: item["附加盟约1"],
                covenant2: item["附加盟约2"],
                traitType: item["特质类型"],
                traitDesc: item["特质描述"],
                filterTag,
                my,
                zd
            }
        });
        setOriginList(processList);
        setSelectList(processList);
    }, []);

    useEffect(() => {
        if(activeFilter.length === 0){
            setSelectList(originList);
            return;
        }
        let selectList = originList.filter((item) => {
            console.log(item.name, item.filterTag, activeFilter)
            return activeFilter.every((tag) => {
                if(item.filterTag.includes(tag)){
                    return true;
                }
            });
        });
        setSelectList(selectList)
        setSelectOne(selectList[0] || {})
    }, [originList, activeFilter]);


    return (
    <div id="wx-excel-page">
        {/* <Table dataSource={data} columns={columns} /> */}
        <div className="filter-container">
            <div className="filter-list">{ [1,2,3,4,5,6].map((item) => {
                return <Button key={"filter-" + item } className={"filter-one " + (activeFilter.includes(item) ? "filter-one-select" : "")} onClick={() => handleFilterChange(item, 0)}>{item + "阶"}</Button>
            }) }</div>
            <div className="filter-list">{ hxmy.map((item) => {
                return <Button key={"filter-" + item } className={"filter-one " + (activeFilter.includes(item) ? "filter-one-select" : "")} onClick={() => handleFilterChange(item, 0)}>{item}</Button>
            }) }</div>
            <div className="filter-list">{ my.map((item) => {
                return <Button key={"filter-" + item } className={"filter-one " + (activeFilter.includes(item) ? "filter-one-select" : "")} onClick={() => handleFilterChange(item, 0)} >{item}</Button>
            }) }</div>
            <div className="filter-list">{ zd.map((item) => {
                return <Button key={"filter-" + item } className={"filter-one " + (activeFilter.includes(item) ? "filter-one-select" : "")} onClick={() => handleFilterChange(item, 0)} >{item}</Button>
            }) }
                <Button className="filter-one" onClick={() => setActiveFilter([])} >清除</Button>
            </div>
        </div>
        <div className='operator-show'>
            <div className='operator-left'>
                <div className="operator-list custom-scrollbar">
                    { selectList.map((item, i) => {
                        return <div  key={"select-" + i} className={"operator-one " + (selectOne.name === item.name ? "operator-one-select " : "") + "border-level-" + item.level} onClick={() => selectOneS(item)}>
                            <div><img alt={item.name} src={"/images/头像_" + item.name + ".png"}/></div>
                            <div>{item.name}</div>    
                        </div>
                    })}
                    <div className="operator-one none">
                        <div></div>
                        <div></div>    
                    </div>
                </div>
            </div>
            <div className='operator-right'>
                <div className={"selct-one-detail border-level-" + (selectOne.level || 0)}>
                    {/*干员描述*/}
                    {selectOne.name && <div>
                        <img alt={selectOne.name} src={"/images/头像_" + selectOne.name + ".png"}/>
                        <h2>{selectOne.name}</h2>
                        <p>阶数：{selectOne.level}</p>
                        <p>盟约：{selectOne.my ? (selectOne.my.map(item => (item + " ")) + " ") : ""}</p>
                        <p>特质类型：{selectOne.traitType}</p>
                        <p>特质描述：{selectOne.traitDesc}</p>
                        { selectOne.zd && <p>字段：{selectOne.zd}</p>}
                    </div>  
                    }
                </div>    
            </div>
            
        </div>
        
    </div>
  );
}

export default App;
 