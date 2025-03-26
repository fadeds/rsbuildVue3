"use strict";(self.webpackChunkrsbuild_vue3=self.webpackChunkrsbuild_vue3||[]).push([["221"],{4978:function(e,l,a){a.d(l,{yz:()=>d});var t=a(8569);let d=e=>t.Z.post("/app/zy/bu/inHospitalList",e)},6079:function(e,l,a){a.d(l,{SR:()=>o,a1:()=>u,gp:()=>d,xO:()=>i,zv:()=>r});var t=a(8569);let d=e=>t.Z.post("/app/zy/adviceinfo/list",e),u=e=>t.Z.post("/app/zy/adviceinfo/save",e),o=e=>t.Z.post("/app/zy/adviceinfo/delete",e),i=e=>t.Z.post("/app/zy/drugMedical/druglist",e),r=e=>t.Z.post("/app/zy/bu/getId",e)},4897:function(e,l,a){a.d(l,{Z:()=>i});var t=a(4689);a(1300),a(1470);var d=a(8092);a(3260);var u=a(8063);a(4854),a(2239),a(4510),a(793),a(102),a(5123);var o=a(796);let i=(0,a(3744).default)({__name:"PatientInfo",props:{patientInfo:{type:Object,default:()=>({})}},setup(e){let l=JSON.parse(localStorage.getItem("dicOption")),a=(0,o.iH)(e.patientInfo);return(i,r)=>{let n=t.nH,p=u.Dv,m=d.dq,s=t.ly;return(0,o.wg)(),(0,o.j4)(s,{model:a.value,"label-width":"100px"},{default:(0,o.w5)(()=>[(0,o.Wm)(m,{gutter:20},{default:(0,o.w5)(()=>[(0,o.Wm)(p,{span:8},{default:(0,o.w5)(()=>[(0,o.Wm)(n,{label:"档案号："},{default:(0,o.w5)(()=>[(0,o.Uk)((0,o.zw)(e.patientInfo.zyh),1)]),_:1})]),_:1}),(0,o.Wm)(p,{span:8},{default:(0,o.w5)(()=>[(0,o.Wm)(n,{label:"姓名："},{default:(0,o.w5)(()=>[(0,o.Uk)((0,o.zw)(e.patientInfo.patientName),1)]),_:1})]),_:1}),(0,o.Wm)(p,{span:8},{default:(0,o.w5)(()=>[(0,o.Wm)(n,{label:"诊断："},{default:(0,o.w5)(()=>{var a;return[(0,o.Uk)((0,o.zw)(null===(a=(0,o.SU)(l).诊断.find(l=>l.code==e.patientInfo.diagnosisCode1))||void 0===a?void 0:a.name),1)]}),_:1})]),_:1})]),_:1})]),_:1},8,["model"])}}},[["__scopeId","data-v-6ff5520d"]])},9947:function(e,l,a){a.d(l,{Z:()=>p});var t=a(7282);a(1300),a(6181),a(4459);var d=a(5765);a(5802);var u=a(7270);a(8413),a(4510),a(793),a(102),a(5123);var o=a(796),i=a(4978);let r={class:"patient-list"},n={class:"search-bar"},p=(0,a(3744).default)({__name:"patientList",props:{inHospital:{type:Boolean,default:!1}},emits:["selectPatient"],setup(e,l){let{expose:a,emit:p}=l,m=JSON.parse(localStorage.getItem("dicOption")),s=(0,o.iH)({patientName:null}),w=(0,o.iH)([]);function c(){e.inHospital&&(s.value.isIn="1"),(0,i.yz)(s.value).then(e=>{w.value=e.row})}function v(e){p("selectPatient",e)}return(0,o.bv)(()=>{c()}),a({patientList:w,getList:c}),(e,l)=>{let a=u.EZ,i=d.mi,p=t.$Y,f=t.eI;return(0,o.wg)(),(0,o.iD)("div",r,[(0,o._)("div",n,[(0,o.Wm)(a,{modelValue:(0,o.SU)(s).patientName,"onUpdate:modelValue":l[0]||(l[0]=e=>(0,o.SU)(s).patientName=e),placeholder:"姓名",style:{width:"200px"},onKeyup:(0,o.D2)(c,["enter"])},null,8,["modelValue"]),(0,o.Wm)(i,{type:"primary",onClick:c},{default:(0,o.w5)(()=>l[1]||(l[1]=[(0,o.Uk)("搜索")])),_:1})]),(0,o.Wm)(f,{data:(0,o.SU)(w),style:{width:"100%"},height:"calc(100vh - 180px)","highlight-current-row":"",onRowClick:v},{default:(0,o.w5)(()=>[(0,o.Wm)(p,{prop:"zyh",label:"档案号",width:"100"}),(0,o.Wm)(p,{prop:"patientName",label:"姓名",width:"100"}),(0,o.Wm)(p,{prop:"cardNo",label:"证件号",width:"100"}),(0,o.Wm)(p,{prop:"bedNo",label:"床位号",width:"100"}),(0,o.Wm)(p,{prop:"department",label:"科室"},{default:(0,o.w5)(e=>{var l;return[(0,o.Uk)((0,o.zw)(null===(l=(0,o.SU)(m).科室.find(l=>l.code==e.row.department))||void 0===l?void 0:l.name),1)]}),_:1})]),_:1},8,["data"])])}}},[["__scopeId","data-v-94ab405a"]])},593:function(e,l,a){a.r(l),a.d(l,{default:()=>f});var t=a(655);a(1300),a(8753),a(8452);var d=a(4689);a(1470);var u=a(157);a(7612),a(2239);var o=a(6864);a(8561),a(3140);var i=a(7282);a(6181);var r=a(5765);a(5802),a(4459);var n=a(4897);a(7979);var p=a(9947);a(9929),a(6301),a(5123),a(793),a(102),a(2394),a(9560),a(9734),a(5646),a(9774),a(4510);var m=a(796),s=a(6079),w=a(2110);a(1342);let c={class:"table-operations"},v={class:"action-buttons"},f=(0,a(3744).default)({__name:"index",setup(e){let l=(0,m.iH)(null),a=(0,m.iH)(null),f=(0,m.iH)([]),g=(0,m.iH)([]),y=(0,m.iH)([]),_={adviceType:[{required:!0,message:"请选择医嘱类型",trigger:"change"}],itemType:[{required:!0,message:"请选择项目类型",trigger:"change"}],itemCode:[{required:!0,message:"请选择药品名称",trigger:"change"}],frequency:[{required:!0,message:"请选择用药频次",trigger:"change"}],usageCode:[{required:!0,message:"请选择用法",trigger:"change"}],count:[{required:!0,message:"请输入数量",trigger:"blur"},{type:"number",min:.01,message:"数量必须大于0",trigger:"blur"}]},h=(0,m.iH)({patientId:"",patientNo:"",patientName:"",sex:"",diagnosisName1:""}),W=(0,m.iH)([]),b=(0,m.iH)({}),U=async()=>{try{let e=await (0,s.xO)({});W.value=e.data}catch(e){}},z=(e,l)=>{f.value[l].itemCode="",b.value[e]=W.value.filter(l=>l.itemType===e)},C=(e,l)=>{let a=W.value.find(l=>l.drugCode===e);a&&(f.value[l]={...f.value[l],unit:a.unit,price:a.unitPrice,count:a.count})},k=async()=>{f.value.push({adviceType:"0",itemType:"",frequency:"",usageCode:"",dose:1,unit:"",price:0})},V=e=>{(0,s.SR)([e.id]).then(e=>{0===e.code&&(w.z8.success("删除成功"),S())}).catch(e=>{w.z8.error("删除失败")})},S=async()=>{let e=await (0,s.gp)({zyh:h.value.zyh});g.value=e.rows},H=e=>{f.value.splice(e,1)},x=()=>{let e=y.value.map(e=>f.value.indexOf(e));e.sort((e,l)=>l-e),e.forEach(e=>{e>-1&&f.value.splice(e,1)})},T=e=>{y.value=e},I=e=>{h.value=e,f.value=[],S()},q=async()=>{if(!h.value.zyh){w.z8.warning("请先选择患者");return}if(0===f.value.length){w.z8.warning("请添加医嘱");return}try{await a.value.validate();let e=await (0,s.zv)();f.value.forEach(l=>{l.adviceNo=e.seq});let l={zyh:h.value.zyh,adviceInfos:f.value};await (0,s.a1)(l),w.z8.success("保存成功"),f.value=[],S()}catch(e){!1===e?w.z8.warning("请完善表单信息"):w.z8.error("保存失败")}},N=()=>{var e;f.value=[],null===(e=a.value)||void 0===e||e.resetFields()};(0,m.bv)(()=>{U()});let $=JSON.parse(localStorage.getItem("dicOption"));return(e,s)=>{let w=p.Z,y=t.$w,U=n.Z,S=i.$Y,Z=r.mi,O=i.eI,j=o.BT,D=o.km,Y=d.nH,K=u.d6,P=d.ly,R=t.b2,L=t.G4;return(0,m.wg)(),(0,m.j4)(L,null,{default:(0,m.w5)(()=>[(0,m.Wm)(y,{width:"400px"},{default:(0,m.w5)(()=>[(0,m.Wm)(w,{ref_key:"patientListRef",ref:l,inHospital:"",onSelectPatient:I},null,512)]),_:1}),(0,m.Wm)(R,null,{default:(0,m.w5)(()=>[(0,m.Wm)(U,{"patient-info":h.value},null,8,["patient-info"]),(0,m.Wm)(O,{data:g.value,style:{width:"100%"},border:""},{default:(0,m.w5)(()=>[(0,m.Wm)(S,{label:"医嘱类型",prop:"adviceType",width:"120"},{default:(0,m.w5)(e=>{var l;return[(0,m.Uk)((0,m.zw)(null===(l=(0,m.SU)($).医嘱类型.find(l=>l.code==e.row.adviceType))||void 0===l?void 0:l.name),1)]}),_:1}),(0,m.Wm)(S,{label:"项目类型",prop:"itemType",width:"120"},{default:(0,m.w5)(e=>{var l;return[(0,m.Uk)((0,m.zw)(null===(l=(0,m.SU)($).项目类型.find(l=>l.code==e.row.itemType))||void 0===l?void 0:l.name),1)]}),_:1}),(0,m.Wm)(S,{label:"药品名称",prop:"itemCode"},{default:(0,m.w5)(e=>{var l;return[(0,m.Uk)((0,m.zw)(null===(l=W.value.find(l=>l.drugCode==e.row.itemCode))||void 0===l?void 0:l.drugName),1)]}),_:1}),(0,m.Wm)(S,{label:"用药频次",prop:"frequency"},{default:(0,m.w5)(e=>{var l;return[(0,m.Uk)((0,m.zw)(null===(l=(0,m.SU)($).频次.find(l=>l.code==e.row.frequency))||void 0===l?void 0:l.name),1)]}),_:1}),(0,m.Wm)(S,{label:"用法",prop:"usageCode"},{default:(0,m.w5)(e=>{var l;return[(0,m.Uk)((0,m.zw)(null===(l=(0,m.SU)($).用法.find(l=>l.code==e.row.usageCode))||void 0===l?void 0:l.name),1)]}),_:1}),(0,m.Wm)(S,{label:"数量",prop:"dose",width:"100"}),(0,m.Wm)(S,{label:"操作",width:"120"},{default:(0,m.w5)(e=>[(0,m.Wm)(Z,{type:"danger",size:"small",onClick:l=>V(e.row)},{default:(0,m.w5)(()=>s[0]||(s[0]=[(0,m.Uk)("删除")])),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),s[6]||(s[6]=(0,m._)("br",null,null,-1)),(0,m._)("div",c,[(0,m.Wm)(Z,{type:"primary",onClick:k},{default:(0,m.w5)(()=>s[1]||(s[1]=[(0,m.Uk)("新增医嘱")])),_:1}),(0,m.Wm)(Z,{type:"danger",onClick:x},{default:(0,m.w5)(()=>s[2]||(s[2]=[(0,m.Uk)("批量删除")])),_:1})]),(0,m.Wm)(P,{ref_key:"orderFormRef",ref:a,model:f.value,rules:_},{default:(0,m.w5)(()=>[(0,m.Wm)(O,{data:f.value,style:{width:"100%"},border:"",onSelectionChange:T},{default:(0,m.w5)(()=>[(0,m.Wm)(S,{type:"selection",width:"55"}),(0,m.Wm)(S,{label:"医嘱类型",width:"120"},{default:(0,m.w5)(e=>[(0,m.Wm)(Y,{prop:""+e.$index+".adviceType",rules:_.adviceType},{default:(0,m.w5)(()=>[(0,m.Wm)(D,{modelValue:e.row.adviceType,"onUpdate:modelValue":l=>e.row.adviceType=l,placeholder:"医嘱类型",size:"small"},{default:(0,m.w5)(()=>[((0,m.wg)(!0),(0,m.iD)(m.HY,null,(0,m.Ko)((0,m.SU)($).医嘱类型,e=>((0,m.wg)(),(0,m.j4)(j,{key:e.code,label:e.name,value:e.code},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop","rules"])]),_:1}),(0,m.Wm)(S,{label:"项目类型",width:"120"},{default:(0,m.w5)(e=>[(0,m.Wm)(Y,{prop:""+e.$index+".itemType",rules:_.itemType},{default:(0,m.w5)(()=>[(0,m.Wm)(D,{modelValue:e.row.itemType,"onUpdate:modelValue":l=>e.row.itemType=l,placeholder:"项目类型",size:"small",onChange:l=>z(l,e.$index)},{default:(0,m.w5)(()=>[((0,m.wg)(!0),(0,m.iD)(m.HY,null,(0,m.Ko)((0,m.SU)($).项目类型,e=>((0,m.wg)(),(0,m.j4)(j,{key:e.code,label:e.name,value:e.code},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]),_:2},1032,["prop","rules"])]),_:1}),(0,m.Wm)(S,{label:"药品名称"},{default:(0,m.w5)(e=>[(0,m.Wm)(Y,{prop:""+e.$index+".itemCode",rules:_.itemCode},{default:(0,m.w5)(()=>[(0,m.Wm)(D,{modelValue:e.row.itemCode,"onUpdate:modelValue":l=>e.row.itemCode=l,placeholder:"药品名称",size:"small",onChange:l=>C(e.row.itemCode,e.$index)},{default:(0,m.w5)(()=>[((0,m.wg)(!0),(0,m.iD)(m.HY,null,(0,m.Ko)(b.value[e.row.itemType]||[],e=>((0,m.wg)(),(0,m.j4)(j,{key:e.drugCode,label:e.drugName,value:e.drugCode},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]),_:2},1032,["prop","rules"])]),_:1}),(0,m.Wm)(S,{label:"用药频次"},{default:(0,m.w5)(e=>[(0,m.Wm)(Y,{prop:""+e.$index+".frequency",rules:_.frequency},{default:(0,m.w5)(()=>[(0,m.Wm)(D,{modelValue:e.row.frequency,"onUpdate:modelValue":l=>e.row.frequency=l,placeholder:"用药频次",size:"small"},{default:(0,m.w5)(()=>[((0,m.wg)(!0),(0,m.iD)(m.HY,null,(0,m.Ko)((0,m.SU)($).频次,e=>((0,m.wg)(),(0,m.j4)(j,{key:e.code,label:e.name,value:e.code},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop","rules"])]),_:1}),(0,m.Wm)(S,{label:"用法"},{default:(0,m.w5)(e=>[(0,m.Wm)(Y,{prop:""+e.$index+".usageCode",rules:_.usageCode},{default:(0,m.w5)(()=>[(0,m.Wm)(D,{modelValue:e.row.usageCode,"onUpdate:modelValue":l=>e.row.usageCode=l,placeholder:"用法",size:"small"},{default:(0,m.w5)(()=>[((0,m.wg)(!0),(0,m.iD)(m.HY,null,(0,m.Ko)((0,m.SU)($).用法,e=>((0,m.wg)(),(0,m.j4)(j,{key:e.code,label:e.name,value:e.code},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop","rules"])]),_:1}),(0,m.Wm)(S,{label:"数量",width:"100"},{default:(0,m.w5)(e=>[(0,m.Wm)(Y,{prop:""+e.$index+".count",rules:_.count},{default:(0,m.w5)(()=>[(0,m.Wm)(K,{modelValue:e.row.count,"onUpdate:modelValue":l=>e.row.count=l,min:.01,precision:2,step:.1,size:"small","controls-position":"right"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop","rules"])]),_:1}),(0,m.Wm)(S,{label:"操作",width:"120"},{default:(0,m.w5)(e=>[(0,m.Wm)(Z,{type:"danger",size:"small",onClick:l=>H(e.$index)},{default:(0,m.w5)(()=>s[3]||(s[3]=[(0,m.Uk)(" 删除 ")])),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),(0,m._)("div",v,[(0,m.Wm)(Z,{type:"primary",onClick:q},{default:(0,m.w5)(()=>s[4]||(s[4]=[(0,m.Uk)("保存医嘱")])),_:1}),(0,m.Wm)(Z,{onClick:N},{default:(0,m.w5)(()=>s[5]||(s[5]=[(0,m.Uk)("重置")])),_:1})])]),_:1},8,["model"])]),_:1})]),_:1})}}},[["__scopeId","data-v-01850028"]])}}]);