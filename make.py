import os
import re

TEMPLATE_DIR = 'templates'
FABRIC_FILE = 'fabric.html'
HEADER_FILE = 'header.html'
FOOTER_FILE = 'footer.html'
HEADER_BUTTON_TEMPLATE = '<a href="%s" class="mdl-layout__tab%s">%s</a>'
PAGE_CONFS = [
    {
        'title': 'Home',
        'slug': '/',
        'content': 'home.html',
        'output': 'index.html'
    },
    {
        'title': 'Showcase',
        'slug': '/showcase',
        'content': 'showcase.html',
        'output': 'showcase/index.html'
    },
    {
        'title': 'Toys',
        'slug': '/toys',
        'content': 'toys.html',
        'output': 'toys/index.html'
    },
    {
        'title': 'Articles',
        'slug': '/articles',
        'content': 'articles.html',
        'output': 'articles/index.html'
    }
]

if __name__ == '__main__':
    for index, page in enumerate(PAGE_CONFS):
        with open(os.path.join(TEMPLATE_DIR, FABRIC_FILE), 'r') as fabric_f:
            content = fabric_f.read()
            content = content.replace('{# title #}', page['title'])

            '''
            Make headers
            '''
            with open(os.path.join(TEMPLATE_DIR, HEADER_FILE), 'r') as header_f:
                header_block = header_f.read()
                buttons_block = ''
                for index_, page_ in enumerate(PAGE_CONFS):
                    buttons_block += HEADER_BUTTON_TEMPLATE % (page_['slug'], ' is-active' if index_ == index else '', page_['title'])
                    if index_ < len(PAGE_CONFS) - 1:
                        buttons_block += '\n'
                header_block = header_block.replace('{# header_buttons #}', buttons_block)
                content = content.replace('{# header #}', header_block)

            '''
            Add content
            '''
            try:
                with open(os.path.join(TEMPLATE_DIR, page['content']), 'r') as block_f:
                    content_block = block_f.read()
                    content = content.replace('{# content #}', content_block)
            except Exception as e:
                print(e)
            
            '''
            Append footer
            '''
            with open(os.path.join(TEMPLATE_DIR, FOOTER_FILE), 'r') as footer_f:
                content = content.replace('{# footer #}', footer_f.read())
    
            '''
            Output
            '''
            with open(page['output'], 'w+') as out_f:
                out_f.write(content)
