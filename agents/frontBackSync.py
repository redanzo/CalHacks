from uagents import Agent, Context

# agent : def
frontBackSync = Agent(name="frontbacksync", seed="gets a list of required skills and sends to singlestore")

# agent : on startup -> greet
@frontBackSync.on_event("startup")
async def introduce_agent(ctx: Context):
    ctx.logger.info(f"Hello, I'm agent {frontBackSync.name} and my address is {frontBackSync.address}.")

# agent : run
if __name__ == "__main__":
    frontBackSync.run()