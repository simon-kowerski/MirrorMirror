#imports for stable diffusion
import torch
avail=torch.cuda.is_available()
if not avail:
    raise Exception("CUDA not available")
from diffusers import DiffusionPipeline, EulerAncestralDiscreteScheduler
#imports for clip interrogator
from PIL import Image
from clip_interrogator import Config, Interrogator

from datetime import date
import time

device = "cuda"
model_id = "stabilityai/stable-diffusion-xl-base-1.0"

def count_tokens(prompt):
    return len(prompt.split())

def _build_prompt(prompt1, prompt2):
    add="In a fantasy style. Cyberpunk, watercolor. "
    prompt1 = prompt1.split(",")
    prompt2 = prompt2.split(",")
    ret = ""

    for i in range(len(prompt1)) if len(prompt1) < len(prompt2) else range(len(prompt2)):
        ret += f"{prompt1[i]}, {prompt2[i]}, "

        if i > 40:
            break

    newprompt = open("prompt.txt", "w", encoding="utf-8")
    try:
        newprompt.write(ret.encode('utf-8', 'ignore').decode())
    except:
        newprompt.close()
        import os
        os.remove("prompt.txt")

    return add + ret

def interrogator(name1, name2):
    #print("Interrogating")
    image = Image.open(f"{name1}").convert('RGB')

    ci = Interrogator(Config(clip_model_name="ViT-L-14/openai", device=device, caption_max_length=15, quiet=True))
    
    prompt1 = ""
    try:
        oldprompt = open("prompt.txt", "r")
        prompt1 = oldprompt.read()
        oldprompt.close()
    except:
        print("Prompt not found")
        prompt1=ci.interrogate(image)

    image = Image.open(f"{name2}").convert('RGB')
    prompt2=ci.interrogate(image)

    prompt = _build_prompt(prompt1, prompt2)


    #print(prompt)
    #print(count_tokens(prompt))

    return prompt

def generate(prompt):
    #print("Generating")
    
    print(prompt)
    pipe = DiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
    pipe.scheduler = EulerAncestralDiscreteScheduler.from_config(pipe.scheduler.config)
    pipe = pipe.to(device)

    image = pipe(prompt, num_inference_steps=60, guidance_scale=9).images[0]  
    image.save("generated_images/output.png")
    image.save(f"../archive/{str(date.today())}-{time.time()}.png")


