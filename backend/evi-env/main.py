# import asyncio
# import base64
# import datetime
# import os
# from dotenv import load_dotenv
# from hume.client import AsyncHumeClient
# from hume.empathic_voice.chat.socket_client import ChatConnectOptions, ChatWebsocketConnection
# from hume.empathic_voice.chat.types import SubscribeEvent
# from hume.empathic_voice.types import UserInput
# from hume.core.api_error import ApiError
# from hume import MicrophoneInterface, Stream

# # import os
# # import asyncio

# # async def main() -> None:
# #     HUME_API_KEY = os.getenv("HUME_API_KEY")
# #     HUME_SECRET_KEY = os.getenv("HUME_SECRET_KEY")
# #     HUME_CONFIG_ID = os.getenv("HUME_CONFIG_ID")
    
# #     client = AsyncHumeClient(api_key=HUME_API_KEY)

# #     options = ChatConnectOptions(config_id=HUME_CONFIG_ID, secret_key=HUME_SECRET_KEY)
    
# #     # Instantiate the WebSocketInterface
# #     websocket_interface = WebSocketInterface()

    
# #     # Open the WebSocket connection with the configuration options and the interface's handlers
# #     async with client.empathic_voice.chat.connect_with_callbacks(
# #       options=options,
# #       on_open=websocket_interface.on_open,
# #       on_message=websocket_interface.on_message,
# #       on_close=websocket_interface.on_close,
# #       on_error=websocket_interface.on_error
# #     ) as socket:
# #         websocket_interface.set_socket(socket)
        
# #     microphone_task = asyncio.create_task(MicrophoneInterface.start(socket, byte_stream=websocket_interface.byte_strs))
    
# #     await microphone_task
    
# #     # Specify device 4 in MicrophoneInterface
# #     MicrophoneInterface.start(socket, device=2, allow_user_interrupt=True, byte_stream=websocket_interface.byte_strs)
    
# #     # Directly import the sounddevice library
# #     # import sounddevice as sd

# #     # Set the default device prior to scheduling audio input task
# #     # sd.default.device = 2
    
# #     # Specify allowing interruption
# #     MicrophoneInterface.start(socket, allow_user_interrupt=True, byte_stream=websocket_interface.byte_strs)

# # asyncio.run(main())

# # from hume import HumeVoiceClient, MicrophoneInterface
# # # avoid hard coding your API key, retrieve from environment variables
# # HUME_API_KEY = os.getenv("HUME_API_KEY")
# # # Connect and authenticate with Hume
# # client = HumeVoiceClient(HUME_API_KEY)
# # # establish a connection with EVI with your configuration by passing
# # # the config_id as an argument to the connect method

# # async def main():
# #     client.connect(config_id=os.getenv("HUME_CONFIG_ID")) as socket: await MicrophoneInterface.start(socket)


# import os
# import asyncio
# from dotenv import load_dotenv
# from hume import HumeVoiceClient

# class MicrophoneInterface:
#     @staticmethod
#     async def start(socket):
#         # Your logic to handle microphone input
#         pass

# async def main():
#     load_dotenv()   
#     HUME_CONFIG_ID = os.getenv("HUME_CONFIG_ID")
#     HUME_API_KEY = os.getenv("HUME_API_KEY")
#     if not HUME_CONFIG_ID:
#         print("HUME_CONFIG_ID is not set. Please check your environment variables.")
#         return
    
#     client = HumeVoiceClient(HUME_API_KEY)

#     async with client.connect(config_id=HUME_CONFIG_ID) as socket:
#         await MicrophoneInterface.start(socket)

# if __name__ == "__main__":
#     asyncio.run(main())


# from hume.client import HumeClient
# import os
# from dotenv import load_dotenv

# load_dotenv()

# client = HumeClient(
#     api_key=os.getenv("HUME_API_KEY"), # Defaults to HUME_API_KEY
# )
# client.empathic_voice.configs.list_configs()

import asyncio
import base64
import datetime
import os
from dotenv import load_dotenv
from hume.client import AsyncHumeClient
from hume.empathic_voice.chat.socket_client import ChatConnectOptions, ChatWebsocketConnection
from hume.empathic_voice.chat.types import SubscribeEvent
from hume.empathic_voice.types import UserInput
from hume.core.api_error import ApiError
from hume import MicrophoneInterface, Stream, StreamDataModels

from hume.legacy import HumeVoiceClient, VoiceConfig


async def main() -> None:
  # Retrieve any environment variables stored in the .env file
  load_dotenv()

  # Retrieve the API key, Secret key, and EVI config id from the environment variables
  HUME_API_KEY = os.getenv("HUME_API_KEY")
  HUME_SECRET_KEY = os.getenv("HUME_SECRET_KEY")
  HUME_CONFIG_ID = os.getenv("HUME_CONFIG_ID")

  # Initialize the asynchronous client, authenticating with your API key
  client = AsyncHumeClient(api_key=HUME_API_KEY)

  # Define options for the WebSocket connection, such as an EVI config id and a secret key for token authentication
  options = ChatConnectOptions(config_id=HUME_CONFIG_ID, secret_key=HUME_SECRET_KEY)
  
  # Instantiate the WebSocketInterface
  websocket_interface = WebSocketInterface()
  # Open the WebSocket connection with the configuration options and the interface's handlers
  async with client.empathic_voice.chat.connect_with_callbacks(
      options=options,
      on_open=websocket_interface.on_open,
      on_message=websocket_interface.on_message,
      on_close=websocket_interface.on_close,
      on_error=websocket_interface.on_error
    ) as socket:
  
      # Set the socket instance in the handler
      websocket_interface.set_socket(socket)
      
      # Create an asynchronous task to continuously detect and process input from the microphone, as well as play audio
      microphone_task = asyncio.create_task(MicrophoneInterface.start(socket, byte_stream=websocket_interface.byte_strs))
    
      # Await the microphone task
      await microphone_task
      
      # Specify device 4 in MicrophoneInterface
      MicrophoneInterface.start(socket, device=4, allow_user_interrupt=True, byte_stream=websocket_interface.byte_strs)
      
      # Directly import the sounddevice library
      import sounddevice as sd

      # Set the default device prior to scheduling audio input task
      sd.default.device = 4
      
      # Specify allowing interruption
      MicrophoneInterface.start(socket, allow_user_interrupt=True, byte_stream=websocket_interface.byte_strs)

asyncio.run(main())
  
  # ...


# # Load the environment variables from the .env file
# load_dotenv()

# # Retrieve API key and config ID from environment variables
# HUME_API_KEY = os.getenv("HUME_API_KEY")
# HUME_CONFIG_ID = os.getenv("HUME_CONFIG_ID")

# if not HUME_API_KEY or not HUME_CONFIG_ID:
#     raise ValueError("HUME_API_KEY or HUME_CONFIG_ID is not set in the environment variables")

# # Initialize the Hume client
# client = AsyncHumeClient(api_key=HUME_API_KEY)

# # Async function to start microphone interface
# async def start_microphone_interface():
#     async with client.connect(config_id=HUME_CONFIG_ID) as socket:
#         await MicrophoneInterface.start(socket)

# # Run the async function
# if __name__ == "__main__":
#     asyncio.run(start_microphone_interface())
