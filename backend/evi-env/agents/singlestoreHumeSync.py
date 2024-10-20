from uagents import Agent, Context

# agent : def
singlestoreHumeSync = Agent(name="singlestoreHumeSync", seed="gets a list of freelances from singlestore and sends them to hume") 

# agent : on startup -> greet
@singlestoreHumeSync.on_event("startup")
async def introduce_agent(ctx: Context):
    ctx.logger.info(f"Hello, I'm agent {singlestoreHumeSync.name} and my address is {singlestoreHumeSync.address}.")

# agent : run
if __name__ == "__main__":
    singlestoreHumeSync.run()