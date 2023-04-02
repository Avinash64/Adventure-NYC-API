from PIL import Image
import sys

capy = Image.open(f"{sys.argv[1]}")
#bear = Image.open(sys.argv[2])

border = 100
bottom = 150


frame = Image.new('RGBA', (capy.width + border, capy.height + border + bottom), (255, 255, 255, 255))
#bear = bear.resize((frame.width, frame.height))
#frame.paste(bear, (0, 0))

frame.paste(capy, (border//2, border//2))


frame.save(f"ImageHandling/images/{sys.argv[1].split('/')[-1].split('.')[:-1][0]}.png")
