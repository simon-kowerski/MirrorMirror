print("Start Importing")
import torch
avail=torch.cuda.is_available()
if not avail:
    raise Exception("CUDA not available")
from diffusers import DiffusionPipeline, EulerAncestralDiscreteScheduler
print("End Importing")


model_id = "stabilityai/stable-diffusion-xl-base-1.0"
device = "cuda"

pipe = DiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
pipe.scheduler = EulerAncestralDiscreteScheduler.from_config(pipe.scheduler.config)

pipe = pipe.to(device)

prompt="best quality, ultra high res, photorealistic, [big strawberry:skull:0.5] hanging from a tree"
image = pipe(prompt + "In a fantasy style. Cyberpunk, watercolor", num_inference_steps=60, guidance_scale=9, ).images[0]  
image.save("catfly.png")
