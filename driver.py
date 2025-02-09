import time

start=time.time()
from aimodel import generate, interrogator

generate(interrogator("output.png", "userImage.png"))

end=time.time()


print(time.localtime(end).tm_min - time.localtime(start).tm_min)

