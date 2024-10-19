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
from hume import MicrophoneInterface, Stream

import os
import asyncio

async def main() -> None:
    HUME_API_KEY = os.getenv("HUME_API_KEY")
    HUME_SECRET_KEY = os.getenv("HUME_SECRET_KEY")
    HUME_CONFIG_ID = os.getenv("HUME_CONFIG_ID")
    
    client = AsyncHumeClient(api_key=HUME_API_KEY)

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

asyncio.run(main())