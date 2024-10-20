from uagents import Agent, Context
from http.server import BaseHTTPRequestHandler, HTTPServer
import asyncio

PORT=5000

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
        
    def do_POST(self):
        # Send a 200 OK response
        self.send_response(200)
        
        # Set the response headers
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        
        # Get the length of the data
        content_length = int(self.headers['Content-Length'])
        
        # Read the data
        post_data = self.rfile.read(content_length)
        
        # Print the received data to the console
        print(f"POST request received. Data: {post_data.decode('utf-8')}")

        # Send a response message back to the client
        message = "<html><body><h1>POST request processed successfully.</h1></body></html>"
        self.wfile.write(message.encode('utf-8'))
        # print("received the following:", message.encode('utf-8'),sep='\n')

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=PORT):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting HTTP server on port {port}...')
    httpd.serve_forever()
    

# agent : def
frontBackSync = Agent(name="frontbacksync", seed="gets a list of required skills and sends to singlestore")

# agent : on startup -> greet
@frontBackSync.on_event("startup")
async def introduce_agent(ctx: Context):
    ctx.logger.info(f"Hello, I'm agent {frontBackSync.name} and my address is {frontBackSync.address}. I am currently listening on port {PORT}")
    
# Define a function to run the HTTP server
def run_server():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f'Starting HTTP server on port {PORT}...')
    httpd.serve_forever()

# agent : run
if __name__ == "__main__":
    loop = asyncio.get_event_loop()

    # Start the HTTP server in a separate thread
    loop.run_in_executor(None, run_server)

    # Run the agent
    frontBackSync.run()