import SimpleHTTPServer
import SocketServer
import logging
import cgi
import time
import sys
import json

data = {
  "draw": 1,
  "recordsTotal": 1000,
  "recordsFiltered": 1000,
  "data": []
}


def get_row(i):
    return { "0": "Airi" + str(i), "1": "Satou", "2": "Accountant", "3": "Tokyo", "4": "28th Nov 08", "5": "$162,700", "DT_RowId": "row_" + str(i) }

for i in xrange(0, 100):
    data["data"].append(get_row(i))

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        if "/data.json" in self.path:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            i = self.path.find("draw=")
            j = self.path.find("&", i)
            draw = int(self.path[i + 5 : j])            
            
            i = self.path.find("callback=")
            j = self.path.find("&", i)
            jsonp = self.path[i + 9 : j]
            
            data["draw"] = draw
            data["data"].insert(0, get_row(1000 + draw))
            
            self.wfile.write(jsonp + "(" + json.dumps(data) + ");")
        else:
            SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

Handler = ServerHandler
httpd = SocketServer.TCPServer(("", 8000), Handler)
httpd.serve_forever()

