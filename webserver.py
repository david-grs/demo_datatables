import SimpleHTTPServer
import SocketServer
import logging
import cgi
import time
import sys
import json

data = {
  "draw": 1,
  "recordsTotal": 57,
  "recordsFiltered": 57,
  "data": [
    [
      "Airi",
      "Satou",
      "Accountant",
      "Tokyo",
      "28th Nov 08",
      "$162,700"
    ],
    [
      "Angelica",
      "Ramos",
      "Chief Executive Officer (CEO)",
      "London",
      "9th Oct 09",
      "$1,200,000"
    ],
    [
      "Ashton",
      "Cox",
      "Junior Technical Author",
      "San Francisco",
      "12th Jan 09",
      "$86,000"
    ]]}

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        if "/data.json" in self.path:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            i = self.path.find("draw=")
            j = self.path.find("&", i)
            
            draw = int(self.path[i + 5 : j])
            print draw
            
            data["draw"] = draw
            self.wfile.write(json.dumps(data))
        else:
            SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

Handler = ServerHandler
httpd = SocketServer.TCPServer(("", 8001), Handler)
httpd.serve_forever()

