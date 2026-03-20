from pathlib import Path
path = Path('c:/Users/PC/OneDrive/Documents/ZEGEL/POLITICA/index.html')
text = path.read_text(encoding='utf-8')
# Keep only the second body payload (which has the real page content) and rebuild a clean head.
marker = '<body id="inicio">'
parts = text.split(marker)
if len(parts) >= 3:
    # parts[2] is after the second body start and contains the actual page markup
    clean_head = '''<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Mapa de Influencers – Campaña Acuña</title>\n<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="styles.css">\n</head>\n<body id="inicio">'''
    text = clean_head + parts[2]
    # Truncate any stray content after closing html if present
    end_html = text.find('</html>')
    if end_html != -1:
        text = text[:end_html + len('</html>')]
    path.write_text(text, encoding='utf-8')
    print('Cleaned index.html: length', len(text))
else:
    print('Unexpected structure, bodies found:', len(parts))

