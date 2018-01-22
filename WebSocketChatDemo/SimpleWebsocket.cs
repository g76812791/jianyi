using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.WebSockets;
using SuperWebSocket;
using ServiceStack.Redis;
namespace WebSocketChatDemo
{
    /// <summary>
    /// 简单的WebsocketDemo
    /// </summary>
    public class SimpleWebsocket
    {
        /// <summary>
        /// Redis连接池
        /// </summary>
        public static PooledRedisClientManager RedisPool = new PooledRedisClientManager(4000, 20, ConfigurationManager.AppSettings["redisServerIP"] + ":" +
           ConfigurationManager.AppSettings["redisServerPort"]);//
        private  string ip = ConfigurationManager.AppSettings["ip"];
        private  int port = Convert.ToInt32(ConfigurationManager.AppSettings["port"]);
        private WebSocketServer ws = null;//SuperWebSocket中的WebSocketServer对象

        private string RedisListKey = ConfigurationManager.AppSettings["RedisListKey"];
        public SimpleWebsocket()
        {
            ws = new WebSocketServer();//实例化WebSocketServer

            //添加事件侦听
            ws.NewSessionConnected += ws_NewSessionConnected;//有新会话握手并连接成功
            ws.SessionClosed += ws_SessionClosed;//有会话被关闭 可能是服务端关闭 也可能是客户端关闭
            ws.NewMessageReceived += ws_NewMessageReceived;//有新文本消息被接收
            ws.NewDataReceived += ws_NewDataReceived;//有新二进制消息被接收
        }
        void ws_NewSessionConnected(WebSocketSession session)
        {
            Console.WriteLine("{0:HH:MM:ss}  与客户端:{1}创建新会话", DateTime.Now, session.RemoteEndPoint);
        }

        void ws_SessionClosed(WebSocketSession session, SuperSocket.SocketBase.CloseReason value)
        {
            Console.WriteLine("{0:HH:MM:ss}  与客户端:{1}的会话被关闭 原因：{2}", DateTime.Now, session.RemoteEndPoint, value);
        }

        int mycount = 2000;
        void  ws_NewMessageReceived(WebSocketSession session, string value)
        {
            int startcount = 0;
            using (IRedisClient redisCli = RedisPool.GetClient())
            {

                while (true)
                {

                    int qcount = 0;//查询数量
                    int count = redisCli.GetListCount(RedisListKey);//获取总数
                    //如果redis数据刚过期
                    if (count < startcount)
                        startcount = 0;
                    if (count == 0)
                        continue;
                    if (startcount == 0)
                        qcount = count > mycount ? mycount : count;
                    else
                    {
                        qcount = count - startcount;
                        qcount = qcount > mycount ? mycount : qcount;
                    }
                    if (qcount == 0)
                        continue;
                    try
                    {
                        List<string> data = redisCli.GetRangeFromList(RedisListKey, count - qcount, count - 1);
                        if (session.InClosing==false)
                        {
                            var msg = "{\"count\":" + GetSpeed((count - startcount), qcount) + ",\"mes\":\"ok\"}";
                            session.Send(msg);//向客户端发送一个回执
                        }
                        else
                        {
                            break;
                        }
                        foreach (var d in data)
                        {

                            Thread.Sleep(10000 / qcount);
                            if (session.InClosing == false)
                            {
                                var msg = "{\"count\":0,\"mes\":\"" + d + "\"}";
                                session.Send(msg);//向客户端发送一个回执
                            }
                            else
                            {
                                break;
                            }
                        }
                    }
                    catch { continue; }
                    startcount = count;
                }
            }
           
        }

        void ws_NewDataReceived(WebSocketSession session, byte[] value)
        {
            Console.WriteLine("{0:HH:MM:ss} 收到来自客户端的二进制流。 长度:{1}", DateTime.Now, value.Length);
            session.Send(value, 0, value.Length);//将流发送回去

        }


       
        private async Task ProcessWSChat(AspNetWebSocketContext arg)
        {
          
           
        }
        private int GetSpeed(int tcount, int qcount)
        {
            int speed = 20000;
            int maxmcount = 300;
            int scount = tcount / 10 > qcount / 10 ? tcount / 10 : qcount / 10;
            if (scount > maxmcount)
                scount = 300;
            var mlog = Math.Log(scount, maxmcount);
            int retsped = Convert.ToInt32(35000 - (30000 * mlog));
            return retsped;
            //if (tcount > qcount)
            //{
            //    var logs = Math.Log((tcount - qcount)/10, maxmcount);
            //    return Convert.ToInt32()
            //}
            //else
            //{

            //    return speed + (10000 * 10 / mycount) * scount;
            //}
            //int speed = 30000;
            //int maxmcount = 800;
            //if (tcount > qcount)
            //{
            //    int shijimcount = 0;
            //    if (tcount / 10 > 800)
            //        shijimcount = maxmcount;
            //    else
            //        shijimcount = tcount / 10;
            //    return speed - (10000 / 800) * shijimcount;
            //}
            //else
            //{
            //    int scount = mycount - qcount;
            //    return speed + (10000 * 10 / mycount) * scount;
            //}
        }


        /// <summary>
        /// 启动服务
        /// </summary>
        /// <returns></returns>
        public void Start()
        {
            if (!ws.Setup(ip, port))
            {
                Console.WriteLine("SimpleWebSocket 设置WebSocket服务侦听地址失败");
                return;
            }

            if (!ws.Start())
            {
                Console.WriteLine("SimpleWebSocket 启动WebSocket服务侦听失败");
                return;
            }

            Console.WriteLine("SimpleWebSocket 启动服务成功");
        }

        /// <summary>
        /// 停止侦听服务
        /// </summary>
        public void Stop()
        {
            if (ws != null)
            {
                ws.Stop();
            }
        }
    }
}
