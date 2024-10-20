from uagents import Agent, Context

# agent : def
hume = Agent(name="hume", seed="provides insights as to why each of them are the best candidates and talks to the user") 

# agent : on startup -> greet
@hume.on_event("startup")
async def introduce_agent(ctx: Context):
    ctx.logger.info(f"Hello, I'm agent {hume.name} and my address is {hume.address}.")

# agent : run
if __name__ == "__main__":
    hume.run()