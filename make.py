import os
import re

TEMPLATE_DIR = 'templates'
FABRIC_FILE = 'fabric.html'
OUTPUT_FILE = 'index.html'

if __name__ == '__main__':
    with open(os.path.join(TEMPLATE_DIR, FABRIC_FILE), 'r') as fabric_f:
        content = fabric_f.read()
        placeholders = re.findall(r'{# .+ #}', content)

        for placeholder in placeholders:
            block_name = placeholder[3:-3]
            
            try:
                with open("%s.html" % os.path.join(TEMPLATE_DIR, block_name), 'r') as block_f:
                    block = block_f.read()
                    content = content.replace(placeholder, block)
            except Exception as e:
                print(e)
        
        with open(OUTPUT_FILE, 'w+') as out_f:
            out_f.write(content)
