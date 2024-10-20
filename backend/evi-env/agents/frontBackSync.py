from uagents import Agent, Context
from http.server import BaseHTTPRequestHandler, HTTPServer

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Send a 200 OK response
        self.send_response(200)
        
        # Set the response headers
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        
        # The content to send in the response body
        message = "<html><body><h1>Hello! This is a GET response.</h1></body></html>"
        
        # Write the response content
        self.wfile.write(message.encode('utf-8'))

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting HTTP server on port {port}...')
    httpd.serve_forever()
    

# # agent : def
# frontBackSync = Agent(name="frontbacksync", seed="gets a list of required skills and sends to singlestore")

# # agent : on startup -> greet
# @frontBackSync.on_event("startup")
# async def introduce_agent(ctx: Context):
#     ctx.logger.info(f"Hello, I'm agent {frontBackSync.name} and my address is {frontBackSync.address}.")



# agent : run
if __name__ == "__main__":
    # frontBackSync.run()
    run()