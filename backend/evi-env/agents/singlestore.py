from uagents import Agent, Context

# agent : def
singlestore = Agent(name="singlestore", seed="queries the required skills from people data previously stored inside singlestore and gives a list of freelances after some analyzation") 

# agent : on startup -> greet
@singlestore.on_event("startup")
async def introduce_agent(ctx: Context):
    ctx.logger.info(f"Hello, I'm agent {singlestore.name} and my address is {singlestore.address}.")
# agent : run
if __name__ == "__main__":
    singlestore.run()