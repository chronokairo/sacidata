#!/bin/bash
set -e

# Move todos os .md da raiz para docs/, mantendo backup .bak caso já exista em docs
ROOT=$(pwd)
DOCS_DIR="$ROOT/docs"
mkdir -p "$DOCS_DIR"

for f in $(find . -maxdepth 2 -type f -name "*.md" ! -path "./docs/*" | sort); do
  base=$(basename "$f")
  dest="$DOCS_DIR/$base"
  if [ -f "$dest" ]; then
    echo "Destino existe: $dest — criando backup $dest.bak"
    cp "$dest" "$dest.bak"
  fi
  echo "Movendo $f -> $dest"
  mv "$f" "$dest"
done

echo "Concluído. Revise docs/ e remova backups .bak se necessário."