module.exports={
  /**
   * 请求响应过滤
   * @param res wx.request返回的res
   */
  filterResponse:(res)=>{
    let data={
      body:null,//服务器返回的body
      ok: false,//是否操作成功
      status: 0,//服务器返回的status
      message: ''//服务器返回的message
    };
    if(res&&typeof res==='object'&&res.statusCode==200){
      if (res.data && typeof res.data === 'object'){
        data.status = res.data.status;
        data.message = res.data.message||'';
        data.ok = (res.data.status == 200);
        if (data.ok){
          data.body = res.data.body;
        }
      }
    }
    return data;
  }
}