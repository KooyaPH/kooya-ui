import React, {useState} from 'react';
import * as A from '@kooyaph/ui/components';
function Feedback({kind}:{kind:'message'|'notification'|'modal'}){const app=A.App.useApp();return <A.Button onClick={()=>kind==='modal'?app.modal.confirm({title:'Apply sample changes?',content:'This example changes only local demonstration state.',onOk:()=>app.message.success('Changes applied')}):kind==='notification'?app.notification.success({title:'Sample saved',description:'Your local demonstration is ready.'}):app.message.success('Sample action completed')}>Try {kind}</A.Button>}
function Transfer(){const [keys,setKeys]=useState<string[]>(['2']);return <A.Transfer dataSource={['1','2','3','4'].map(key=>({key,title:'Project '+key}))} targetKeys={keys} onChange={v=>setKeys(v.map(String))} render={item=>item.title}/>}
function Form(){const app=A.App.useApp();return <A.Form layout="vertical" onFinish={()=>app.message.success('Valid sample submitted')} style={{maxWidth:360}}><A.Form.Item name="email" label="Email" rules={[{required:true,type:'email'}]}><A.Input placeholder="you@example.com"/></A.Form.Item><A.Form.Item name="role" label="Role" rules={[{required:true}]}><A.Select options={[{value:'designer',label:'Designer'},{value:'developer',label:'Developer'}]}/></A.Form.Item><A.Button htmlType="submit" type="primary">Save profile</A.Button></A.Form>}
function Drawer(){const [open,setOpen]=useState(false);return <><A.Button onClick={()=>setOpen(true)}>Open drawer</A.Button><A.Drawer title="Project settings" open={open} onClose={()=>setOpen(false)}><A.Form layout="vertical" initialValues={{projectName:"Kooya Studio"}}><A.Form.Item name="projectName" label="Project name"><A.Input/></A.Form.Item></A.Form></A.Drawer></>}
function Tour(){const [open,setOpen]=useState(false);const target=React.useRef<HTMLButtonElement>(null);return <><A.Button ref={target} onClick={()=>setOpen(true)}>Start tour</A.Button><A.Tour open={open} onClose={()=>setOpen(false)} steps={[{title:'Welcome to Kooya',description:'Explore the actual native Ant component API.',target:()=>target.current!}]}/></>}
const tree=[{title:'Workspace',key:'workspace',children:[{title:'Design',key:'design'},{title:'Engineering',key:'engineering'}]}];
export const nativeDemos:Record<string,()=>React.ReactNode>={
 BorderBeam:()=> <A.BorderBeam color="#d7f20f"><A.Card>Animated project border</A.Card></A.BorderBeam>, Listy:()=> <A.Listy rowKey="id" height={180} items={Array.from({length:30},(_,i)=>({id:String(i),name:`Project ${i+1}`}))} itemRender={item=><div style={{padding:12}}>{item.name}</div>}/>,
 App:()=> <Feedback kind="message"/>, ConfigProvider:()=> <A.ConfigProvider componentSize="small"><A.Button>Scoped compact control</A.Button></A.ConfigProvider>, Grid:()=> <A.Row gutter={[16,16]}><A.Col span={12}><A.Card>Half</A.Card></A.Col><A.Col span={12}><A.Card>Half</A.Card></A.Col></A.Row>, Row:()=> <A.Row gutter={16}><A.Col span={12}>First column</A.Col><A.Col span={12}>Second column</A.Col></A.Row>, Col:()=> <A.Row><A.Col span={8}>One third</A.Col><A.Col span={16}>Two thirds</A.Col></A.Row>, Drawer:()=> <Drawer/>, Tour:()=> <Tour/>, FloatButton:()=> <div style={{position:"relative",height:180}}><A.FloatButton style={{position:"absolute",right:16,bottom:16}} tooltip="Sample action"/></div>, Image:()=> <A.Image src="/brand/kooya-wordmark.png" width={240} alt="Kooya wordmark"/>, List:()=> <A.List dataSource={["Design","Engineering","Product"]} renderItem={item=><A.List.Item>{item}</A.List.Item>}/>,
 Affix:()=> <A.Affix offsetTop={16}><A.Button>Affixed action</A.Button></A.Affix>,
 Alert:()=> <A.Alert title="Changes saved" description="Your sample settings are ready." type="success" showIcon closable/>,
 Anchor:()=> <div><A.Anchor affix={false} items={[{key:'details',href:'#native-details',title:'Details'}]}/><div id="native-details">Local section</div></div>,
 AutoComplete:()=> <A.AutoComplete aria-label="Search framework" options={['React','Vue','Angular'].map(value=>({value}))} filterOption={(input,option)=>String(option?.value).toLowerCase().includes(input.toLowerCase())} placeholder="Search framework" style={{width:260}}/>,
 Avatar:()=> <A.Avatar.Group><A.Avatar style={{background:'#314300'}}>SK</A.Avatar><A.Avatar style={{background:'#1d46d9'}}>KM</A.Avatar></A.Avatar.Group>,
 Badge:()=> <A.Badge count={5}><A.Avatar shape="square">K</A.Avatar></A.Badge>,
 Breadcrumb:()=> <A.Breadcrumb items={[{title:'Workspace'},{title:'Projects'},{title:'Kooya'}]}/>,
 Button:()=> <A.Space wrap><A.Button type="primary">Primary</A.Button><A.Button>Default</A.Button><A.Button danger>Danger</A.Button><A.Button loading>Loading</A.Button></A.Space>,
 Calendar:()=> <A.Calendar fullscreen={false}/>, Card:()=> <A.Card title="Project overview" extra={<A.Button type="link">Details</A.Button>}>Build your next project with Kooya.</A.Card>,
 Carousel:()=> <A.Carousel arrows autoplay={false}>{['Discover','Build','Share'].map(title=><div key={title}><div style={{padding:48,background:'#314300',color:'#f2eee3',textAlign:'center'}}>{title}</div></div>)}</A.Carousel>,
 Cascader:()=> <A.Cascader aria-label="Select region" options={[{value:'philippines',label:'Philippines',children:[{value:'manila',label:'Manila'},{value:'cebu',label:'Cebu'}]}]}/>,
 Checkbox:()=> <A.Checkbox.Group options={['Design','Engineering','Product']} defaultValue={['Design']}/>,
 Collapse:()=> <A.Collapse items={[{key:'1',label:'What is Kooya UI?',children:'A shared library built on actual Ant Design.'},{key:'2',label:'Can I customize it?',children:'Use the provider theme and public Ant API.'}]}/>,
 ColorPicker:()=> <A.ColorPicker defaultValue="#d7f20f" showText/>,
 DatePicker:()=> <A.DatePicker.RangePicker/>,
 Descriptions:()=> <A.Descriptions title="Project" items={[{key:'1',label:'Name',children:'Kooya Studio'},{key:'2',label:'Status',children:<A.Tag color="green">Active</A.Tag>}]}/>,
 Divider:()=> <div>First section<A.Divider>Next</A.Divider>Second section</div>,
 Dropdown:()=> <A.Dropdown trigger={["hover","click"]} menu={{items:[{key:'edit',label:'Edit'},{key:'duplicate',label:'Duplicate'},{key:'delete',label:'Delete',danger:true}]}}><A.Button>Open actions</A.Button></A.Dropdown>,
 Empty:()=> <A.Empty description="No projects yet"><A.Button type="primary">Create project</A.Button></A.Empty>,
 Flex:()=> <A.Flex gap={12} wrap>{['Discover','Build','Share'].map(v=><A.Tag key={v}>{v}</A.Tag>)}</A.Flex>,
 Form:()=> <Form/>,
 Input:()=> <A.Space orientation="vertical"><A.Input allowClear placeholder="Project name" aria-label="Project name"/><A.Input.Password placeholder="Password" aria-label="Password"/><A.Input.OTP length={6}/></A.Space>,
 InputNumber:()=> <A.InputNumber aria-label="Quantity" min={1} max={100} defaultValue={3}/>,
 Layout:()=> <A.Layout><A.Layout.Header style={{color:'#f2eee3'}}>Workspace</A.Layout.Header><A.Layout.Content style={{padding:24}}>Project content</A.Layout.Content><A.Layout.Footer>Kooya UI</A.Layout.Footer></A.Layout>,
 Masonry:()=> <A.Masonry columns={2} items={[{key:'1',data:'Design'},{key:'2',data:'Engineering'},{key:'3',data:'Product'}]} itemRender={({data})=><A.Card>{String(data)}</A.Card>}/>,
 Mentions:()=> <A.Mentions aria-label="Mention teammate" options={[{value:'stephen',label:'Stephen'},{value:'maya',label:'Maya'}]} placeholder="Use @ to mention a teammate"/>,
 Menu:()=> <A.Menu mode="horizontal" items={[{key:'overview',label:'Overview'},{key:'projects',label:'Projects'},{key:'settings',label:'Settings'}]} defaultSelectedKeys={['overview']}/>,
 message:()=> <Feedback kind="message"/>, Modal:()=> <Feedback kind="modal"/>, notification:()=> <Feedback kind="notification"/>,
 Pagination:()=> <A.Pagination defaultCurrent={1} total={85} showSizeChanger styles={{root:{flexWrap:'wrap',rowGap:8}}}/>,
 Popconfirm:()=> <A.Popconfirm title="Remove sample item?" description="This affects only the demonstration."><A.Button danger>Remove</A.Button></A.Popconfirm>,
 Popover:()=> <A.Popover title="Project details" content="Created for your local demonstration." trigger="click"><A.Button>Show details</A.Button></A.Popover>,
 Progress:()=> <A.Space orientation="vertical"><A.Progress percent={65}/><A.Progress type="circle" percent={75}/></A.Space>,
 QRCode:()=> <A.QRCode value="https://kooya.com.ph"/>,
 Radio:()=> <A.Radio.Group options={['Monthly','Yearly']} defaultValue="Monthly"/>, Rate:()=> <A.Rate defaultValue={4}/>,
 Result:()=> <A.Result status="success" title="Project created" subTitle="Your sample is ready." extra={<A.Button type="primary">Open project</A.Button>}/>,
 Segmented:()=> <A.Segmented options={['List','Board','Timeline']} defaultValue="List"/>, Select:()=> <A.Select mode="multiple" aria-label="Team roles" options={['Design','Engineering','Product'].map(value=>({value,label:value}))} style={{minWidth:260}}/>,
 Skeleton:()=> <A.Skeleton active avatar paragraph={{rows:3}}/>, Slider:()=> <A.Slider range defaultValue={[20,60]}/>,
 Space:()=> <A.Space wrap><A.Button>Cancel</A.Button><A.Button type="primary">Save</A.Button></A.Space>, Spin:()=> <A.Spin description="Loading sample"><div style={{height:120}}>Loading content</div></A.Spin>,
 Splitter:()=> <A.Splitter style={{height:220,border:'1px solid #d5d0c2'}}><A.Splitter.Panel defaultSize="40%" min="20%"><div style={{padding:16}}>Resize sidebar</div></A.Splitter.Panel><A.Splitter.Panel><div style={{padding:16}}>Main content</div></A.Splitter.Panel></A.Splitter>,
 Statistic:()=> <A.Statistic title="Active projects" value={128}/>, Steps:()=> <A.Steps current={1} items={[{title:'Details'},{title:'Review'},{title:'Done'}]}/>, Switch:()=> <A.Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked/>,
 Table:()=> <A.Table rowKey="id" columns={[{title:'Project',dataIndex:'name',sorter:(a,b)=>a.name.localeCompare(b.name)},{title:'Status',dataIndex:'status'}]} dataSource={[{id:'1',name:'Studio',status:'Active'},{id:'2',name:'Portal',status:'Review'}]} pagination={{pageSize:5}}/>,
 Tabs:()=> <A.Tabs items={[{key:'overview',label:'Overview',children:'Project overview'},{key:'activity',label:'Activity',children:'Recent project activity'}]}/>,
 Tag:()=> <A.Space><A.Tag color="green">Active</A.Tag><A.Tag closable>Design</A.Tag></A.Space>, TimePicker:()=> <A.TimePicker.RangePicker/>,
 Timeline:()=> <A.Timeline items={[{content:'Project created'},{content:'Design approved'},{content:'Implementation started'}]}/>, Tooltip:()=> <A.Tooltip title="Save your project"><A.Button>Save</A.Button></A.Tooltip>,
 Transfer:()=> <Transfer/>, Tree:()=> <A.Tree checkable treeData={tree}/>, TreeSelect:()=> <A.TreeSelect treeData={tree.map(v=>({...v,value:v.key,children:v.children.map(c=>({...c,value:c.key}))}))} style={{width:260}} placeholder="Select team"/>,
 Typography:()=> <div><A.Typography.Title level={3}>Build with Kooya</A.Typography.Title><A.Typography.Paragraph copyable>Shared components. Consistent experiences.</A.Typography.Paragraph></div>,
 Upload:()=> <A.Upload beforeUpload={()=>false} multiple><A.Button>Add sample files</A.Button></A.Upload>, Watermark:()=> <A.Watermark content="Kooya"><A.Card style={{height:180}}>Protected sample document</A.Card></A.Watermark>,
};
export function NativeDemo({name}:{name:string}){return nativeDemos[name]?.()??null;}
export function getNativeDemo(name:string){return function Demo(){return <NativeDemo name={name}/>;};}
