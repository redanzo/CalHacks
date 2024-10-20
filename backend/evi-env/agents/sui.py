from uagents import Agent, Context

# agent : def
sui = Agent(name="sui", seed="creates contract and agreement based on recruiter selection")

# agent : on startup -> greet
@sui.on_event("startup")
async def introduce_agent(ctx: Context):
    ctx.logger.info(f"Hello, I'm agent {sui.name} and my address is {sui.address}.")

# agent : run
if __name__ == "__main__":
    sui.run()