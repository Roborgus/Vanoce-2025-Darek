# Vánoce 2025 – Dárek pro Theodora a Kryštofa

Interaktivní webová stránka odhalující vánoční dárek – výlet na zápas Real Madrid!

## O projektu

Tato stránka slouží jako vánoční překvapení. Po naskenování QR kódu se zobrazí:

1. **Tajemná úvodní obrazovka** s napínavou atmosférou
2. **Dramatické odhalení** s konfetami a logem Real Madrid
3. **Hlavní obsah** s odpočítáváním do zápasu a programem výletu

### Detaily výletu

- **Zápas:** Real Madrid vs Girona FC
- **Datum:** 12. dubna 2026
- **Stadion:** Estadio Santiago Bernabéu, Madrid
- **Období:** 9.–13. dubna 2026
- **Účastníci:** Theodor, Kryštof, táta + David, Lukáš, Jára

## Jak spustit

### Lokálně (pro testování)

1. Otevřete soubor `index.html` v prohlížeči
2. Nebo spusťte lokální server:
   ```bash
   python3 -m http.server 8000
   ```
   A otevřete http://localhost:8000

### Online (GitHub Pages)

1. Nahrajte repozitář na GitHub
2. Jděte do **Settings** → **Pages**
3. V sekci "Source" vyberte **Deploy from a branch**
4. Vyberte větev `main` a složku `/ (root)`
5. Klikněte na **Save**
6. Stránka bude za 1-2 minuty dostupná na:
   ```
   https://[username].github.io/Vanoce-2025-Darek/
   ```

## Generování QR kódu

1. Otevřete soubor `generate-qr.html` v prohlížeči
2. Zadejte své GitHub uživatelské jméno
3. Klikněte na "Vygenerovat QR kód"
4. Stáhněte QR kód a vytiskněte ho do vánočního přání

## Struktura projektu

```
├── index.html        # Hlavní stránka
├── style.css         # Styly a animace
├── script.js         # Interaktivita a odpočet
├── generate-qr.html  # Generátor QR kódu
└── assets/
    ├── real-madrid-logo.svg
    └── girona-logo.svg
```

## Volitelné rozšíření

### Přidání zvuku fanoušků

Pro přidání zvukového efektu při odhalení:

1. Stáhněte MP3 soubor se zvukem fanoušků (např. z [freesound.org](https://freesound.org))
2. Uložte ho jako `assets/crowd-cheer.mp3`
3. Zvuk se automaticky přehraje při odhalení dárku

## Úprava dat

Pokud potřebujete změnit datum zápasu nebo jiné údaje:

- **Datum zápasu:** upravte v `script.js` proměnnou `matchDate`
- **Texty:** upravte v `index.html`
- **Barvy/styly:** upravte v `style.css`

## Technologie

- Vanilla HTML5, CSS3, JavaScript
- Bez závislostí na externích frameworkách
- Responsivní design pro mobily i desktop
- CSS animace a 3D efekty

---

¡Hala Madrid! ⚽

