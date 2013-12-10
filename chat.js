/**
 * User: Ravior
 * Date: 13-11-20
 * Time: 下午4:45
 * Dec:Tcp协议聊天室
 */

var net=require('net');
//创建一个TCP服务器
var chatServer=net.createServer();
//创建一个客户端数组
var clientList=[];

chatServer.on('connection',function(client){
    client.name= client.remoteAddress+':'+client.remotePort;
    client.write('Hi,welcome to Tcp chatRoom!\n');
    clientList.push(client);
    client.write("当前在线人数："+clientList.length+'\n');
    client.on('data',function(data){
        broadcast(data,client);
    })
    client.on('end',function(){
        console.log(client.name+'end');
        clientList.splice(clientList.indexOf(client),1);
    })
    client.on('error',function(e){
        console.log(e);
    })
})

function broadcast(data,client){
    var len=clientList.length;
    var cleanup=[];
    for(var i=0;i<len;i++){
        //排除自身客户端
        if(client!=clientList[i]){
            if(clientList[i].writable){
                clientList[i].write(client.name+"说："+data+'\n');
            }
            else{
                cleanup.push(clientList[i]);
                //关闭
                clientList[i].destory();
            }
        }
        //如果是客户端本身
        else{
            client.write("我说："+data+'\n');
        }
    }
    for(var j=0;j<cleanup.length;j++){
        clientList.splice(clientList.indexOf(cleanup[i]),1);
    }
}

chatServer.listen(8090);