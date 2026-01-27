import { Injectable } from '@angular/core';
import { LexicalRoot } from '../models/API/lexicalRoot.model';

@Injectable({ providedIn: 'root' })
export class LexicalParserService {

  parseLexicalDescription(lexical: LexicalRoot): string {
    const paragraphs: string[] = [];
    
    if (!lexical?.root?.children) {
      return '';
    }
    
    for (const paragraph of lexical.root.children) {
      if (paragraph.type === 'paragraph' && paragraph.children) {
        const texts: string[] = [];
        for (const child of paragraph.children) {
          if (child.text) {
            const text = child.format === 1 ? `<b>${child.text}</b>` : child.text;
            texts.push(text);
          }
        }
        if (texts.length > 0) {
          paragraphs.push(texts.join(''));
        }
      }
    }
    
    return paragraphs.join('<br>');
  }
}
