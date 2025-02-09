from PIL import Image
from clip_interrogator import Config, Interrogator
image = Image.open("Images/catfly.png").convert('RGB')
ci = Interrogator(Config(clip_model_name="ViT-L-14/openai",device="cuda",caption_max_length=30))
print(f"\n\n\n{ci.interrogate(image)}")