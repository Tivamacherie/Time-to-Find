window.GameVisuals = {
  cctvAnimId: null,

  // Gender-Distinct 32x32 16-Bit Pixel Art Character Portraits
  sprites: {
    // ================= CASE #01 =================
    // FEMALE: Marianne Reed (Long wavy brown hair, slender shoulders, teal blazer, gold brooch)
    marianne: {
      palette: {
        ".": "#0c1829", "d": "#142640", "h": "#3d2217", "H": "#633927",
        "l": "#824d36", "s": "#f2c2a2", "S": "#d49b79", "e": "#111622",
        "w": "#ffffff", "m": "#c25964", "c": "#186270", "C": "#2693a8",
        "b": "#e8f1fc", "y": "#ffd166"
      },
      grid: [
        "................................",
        "..d...d...d...d...d...d...d...d.",
        "...........hhhhhhhhhh...........",
        ".........hhHHHHHHHHHHhh.........",
        "........hHHHllllllllHHHh........",
        ".......hHHllHHHHHHHHllHHh.......",
        "......hHHlHHssssssssHHlHHh......",
        "......hHHlHssssssssssHlHHh......",
        ".....hHHlHssssssssssssHlHHh.....",
        ".....hHHlsssssssssssssslHHh.....",
        ".....hHHlsswesssssswesslHHh.....",
        ".....hHHlsswesssssswesslHHh.....",
        ".....hHHlsssssssssssssslHHh.....",
        ".....hHHlssssssSSsssssslHHh.....",
        ".....hHHlsssssssssssssslHHh.....",
        ".....hHHllsssssmmsssssllHHh.....",
        "......hHHlssssssssssssHlHHh.....",
        "......hHHllssssssssssllHHh......",
        "......hHHlllSSSSSSSSlllHHh......",
        ".....hHHll....ssss....llHHh.....",
        ".....hHH....ccsssscc....HHh.....",
        ".....hh...ccCCbbbbCCcc...hh.....",
        "........ccCCCCbbbbCCCCcc........",
        "......ccCCCCCCbbbbCCCCCCcc......",
        ".....ccCCCCCCcbyybcCCCCCCcc.....",
        "....ccCCCCCCccbbbbccCCCCCCcc....",
        "...ccCCCCCCccbbbbbbccCCCCCCcc...",
        "...ccCCCCCCccbbbbbbccCCCCCCcc...",
        "..ccCCCCCCcccbbbbbbcccCCCCCCcc..",
        "..ccCCCCCCcccbbbbbbcccCCCCCCcc..",
        "..ccCCCCCCcccbbbbbbcccCCCCCCcc..",
        "..ccCCCCCCcccbbbbbbcccCCCCCCcc.."
      ]
    },

    // MALE: David Reed (Short receding grey hair, exposed ears, square jaw, glasses, broad shoulders)
    david: {
      palette: {
        ".": "#0d1322", "d": "#162038", "g": "#555e6b", "G": "#adb8c7",
        "s": "#e8baa0", "S": "#c49176", "r": "#9e6d56", "e": "#111622",
        "f": "#c8d6e5", "t": "#363b45", "T": "#545b69", "n": "#162e57",
        "N": "#24498a", "w": "#dce6f2"
      },
      grid: [
        "................................",
        "...d...d...d...d...d...d...d....",
        "...........gGgGgGgGgG...........",
        ".........gGgGssssssGgGg.........",
        "........gGgssssssssssgGg........",
        ".......gGgssssssssssssgGg.......",
        ".......gGssssssssssssssGg.......",
        "......gGssssssssssssssssGg......",
        "......gssssssssssssssssssg......",
        ".....SffffffffffffffffffffS.....",
        ".....SfesesssfsssfssesefS.....",
        ".....SfesesssfsssfssesefS.....",
        "......ffffffffffffffffffff......",
        ".......sssrSssssssssSrsss.......",
        ".......ssssssSSssSSssssss.......",
        ".......ssssssssssssssssss.......",
        "........ssssssrrrrssssss........",
        "........ssssssssssssssss........",
        ".........SSssssssssssSS.........",
        "..........SSSSSSSSSSSS..........",
        "............ssssssss............",
        "........ttTT.swwwws.TTtt........",
        "......ttTTttnnwwwwnnttTTtt......",
        "....ttTTttTTnnnwwnnnTTttTTtt....",
        "...ttTTttTTnnnnNNnnnnTTttTTtt...",
        "..ttTTttTTnnnnNNNNnnnnTTttTTtt..",
        "..tTTttTTnnnnNNNNNNnnnnTTttTTt..",
        "..ttTTttTTnnnNNNNNNnnnTTttTTtt..",
        "..tTTttTTnnnnNNNNNNnnnnTTttTTt..",
        "..ttTTttTTnnnNNNNNNnnnTTttTTtt..",
        "..tTTttTTnnnnNNNNNNnnnnTTttTTt..",
        "..ttTTttTTnnnNNNNNNnnnTTttTTtt.."
      ]
    },

    // MALE: Dr. Julian Vance (Short slicked-back black hair, exposed ears, sharp jaw, suit & tie)
    julian: {
      palette: {
        ".": "#0f111c", "d": "#191c2e", "h": "#181921", "H": "#323545",
        "s": "#e6b89c", "S": "#c29174", "e": "#111118", "w": "#f0f4fa",
        "c": "#232733", "C": "#3b4154", "y": "#ffcc00", "Y": "#e69900",
        "t": "#142642"
      },
      grid: [
        "................................",
        "..d...d...d...d...d...d...d...d.",
        "..........hhhhhhhhhhhh..........",
        "........hhHHHHHHHHHHHHhh........",
        ".......hHHHHHHhhhhHHHHHHh.......",
        ".......hHHHssssssssssHHHh.......",
        ".......hHHssssssssssssHHh.......",
        ".......hhsssssssssssssshh.......",
        ".......hsssssssssssssssshh......",
        "......SsshhhhsssshhhhssS......",
        "......SsswesssssswessssS......",
        "......SssssssssssssssssS......",
        "........ssssssssssssssss........",
        "........ssssssSSssssssss........",
        "........ssssssssssssssss........",
        ".........sssssSSsssssss.........",
        ".........ssssssssssssss.........",
        "..........SSssssssssSS..........",
        "...........SSSSSSSSSS...........",
        "............ssssssss............",
        ".......ccCC..swwwws..CCcc.......",
        ".....ccCCCCyywwwwwwyyCCCCcc.....",
        "...ccCCCCCyyywwttwwyyyCCCCCcc...",
        "..ccCCCCCCcyywwttwwyycCCCCCCcc..",
        ".ccCCCCCCCCyywwttwwyyCCCCCCCCcc.",
        ".ccCCCCCCCCcyywwwwyycCCCCCCCCcc.",
        ".ccCCCCCCCCCyywwwwyyCCCCCCCCCcc.",
        ".ccCCCCCCCCCcyyyyyycCCCCCCCCCcc.",
        ".ccCCCCCCCCCCcYYYYcCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCcYYYYcCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCccccccCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCccccccCCCCCCCCCCcc."
      ]
    },

    // MALE: Arthur Pendelton (Security cap, exposed ears, thick white mustache, broad shoulders)
    arthur: {
      palette: {
        ".": "#0b1420", "d": "#122033", "p": "#132947", "P": "#21467a",
        "b": "#070c14", "y": "#ffd11a", "s": "#deb094", "S": "#ba8a6e",
        "e": "#111622", "w": "#ffffff", "m": "#cfd8e3", "M": "#9aa5b4",
        "u": "#1b385e", "U": "#2b5791"
      },
      grid: [
        "................................",
        ".........pppppppppppppp.........",
        ".......ppPPPPPPPPPPPPPPpp.......",
        "......pPPPPPPPyyyyPPPPPPPp......",
        ".....ppPPPPPPPyyyyPPPPPPPpp.....",
        ".....pppppppppppppppppppppp.....",
        "....bbbbbbbbbbbbbbbbbbbbbbbb....",
        "......ssssssssssssssssssss......",
        "......ssssssssssssssssssss......",
        ".....SssMMMMssssssssMMMMssS.....",
        ".....SsswesssssssssswessssS.....",
        ".....SssssssssssssssssssssS.....",
        "......ssssssssSSssssssssss......",
        "......ssssmmmmmmmmmmmmssss......",
        ".....ssssmMMMMMMMMMMMMmssss.....",
        ".....ssssmmSSSSSSSSSSmmssss.....",
        "......ssssssssssssssssssss......",
        ".......SSssssssssssssssSS.......",
        "........SSSSSSSSSSSSSSSS........",
        "...........ssssssssss...........",
        "......uuUU..ssssssss..UUuu......",
        "...uuUUUUUUuussssssuuUUUUUUuu...",
        ".uuUUyyyyUUUuuuuuuuuUUUyyyyUUuu.",
        ".uuUUUUUUUUUuuuuuuuuUUUUUUUUUuu.",
        "uuUUUUUUUUUUuuuuuuuuUUUUyyyyUUuu",
        "uuUUUUUUUUUUuuuuuuuuUUUUyyyyUUuu",
        "uuUUUUUUUUUUuuuuuuuuUUUUUUUUUUuu",
        "uuUUUUUUUUUUuuuuuuuuUUUUUUUUUUuu",
        "uuUUUUUUUUUUuuuuuuuuUUUUUUUUUUuu",
        "uuUUUUUUUUUUuuuuuuuuUUUUUUUUUUuu",
        "uuUUUUUUUUUUuuuuuuuuUUUUUUUUUUuu",
        "uuUUUUUUUUUUuuuuuuuuUUUUUUUUUUuu"
      ]
    },

    // ================= CASE #02 =================
    // FEMALE: Eleanor Ashworth (High silver bun updo, pearl earrings, pearl necklace, emerald gown)
    eleanor: {
      palette: {
        ".": "#140e1c", "d": "#221830", "g": "#8e99ab", "G": "#dce4f0",
        "s": "#ecc0a8", "S": "#c9967b", "e": "#141824", "w": "#ffffff",
        "m": "#c25968", "p": "#f5f7fa", "c": "#14473e", "C": "#237869"
      },
      grid: [
        "...........GGGGGGGGGG...........",
        "..........gGGGGGGGGGGg..........",
        "..........gGGggggggGGg..........",
        ".........gGGGGGGGGGGGGg.........",
        ".......ggGGGGGGGGGGGGGGgg.......",
        "......gGGGGggggggggggGGGGg......",
        ".....gGGgssssssssssssssgGGg.....",
        ".....gGgssssssssssssssssgGg.....",
        ".....ggssssssssssssssssssgg.....",
        ".....gssssssssssssssssssssg.....",
        ".....gsswesssssssssswessssg.....",
        ".....gssssssssssssssssssssg.....",
        "....w.ssssssssSSssssssssss.w....",
        "....w.ssssssssssssssssssss.w....",
        "......sssssssmmmmmmsssssss......",
        ".......ssssssssssssssssss.......",
        "........SSssssssssssssSS........",
        ".........SSSSSSSSSSSSSS.........",
        "...........ssssssssss...........",
        "..........spppppppppps..........",
        ".......ccCCsppppppppsCCcc.......",
        ".....ccCCCCCssssssssCCCCCcc.....",
        "...ccCCCCCCCCccccccCCCCCCCCcc...",
        "..ccCCCCCCCCCCCCCCCCCCCCCCCCcc..",
        ".ccCCCCCCCCCCCCCCCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCCCCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCCCCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCCCCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCCCCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCCCCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCCCCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCCCCCCCCCCCCCCCcc."
      ]
    },

    // MALE: Lucas Ashworth (Short cropped brown hair, exposed ears, square jaw, navy suit & crimson tie)
    lucas: {
      palette: {
        ".": "#0c121e", "d": "#152036", "h": "#261811", "H": "#4d3224",
        "l": "#6b4735", "s": "#f0c2a3", "S": "#cf9a78", "e": "#111622",
        "n": "#162c54", "N": "#25498a", "r": "#b01e36", "t": "#e6eef8"
      },
      grid: [
        "................................",
        "..........hhhhHHHH..............",
        "........hhHHHHllllHHhh..........",
        ".......hHHHHllllllllHHh.........",
        "......hHHHhhhhhhhhhhhhHh........",
        "......hHHssssssssssssHHh........",
        "......hhsssssssssssssshh........",
        "......hsssssssssssssssshh.......",
        ".....SssssssssssssssssssS.......",
        ".....SsshhhhsssshhhhssssS.......",
        ".....SsswesssssswessssssS.......",
        "......ssssssssssssssssss........",
        ".......ssssssssssssssss.........",
        ".......ssssssSSssssssss.........",
        ".......ssssssssssssssss.........",
        "........sssssSSsssssss..........",
        "........ssssssssssssss..........",
        ".........SSssssssssSS...........",
        "..........SSSSSSSSSS............",
        "...........ssssssss.............",
        ".......nnNN..stts..NNnn.........",
        ".....nnNNNNttttttttNNNNnn.......",
        "...nnNNNNNNtttrrttNNNNNNnn......",
        "..nnNNNNNNNtttrrttNNNNNNNnn.....",
        ".nnNNNNNNNNnnrrrrnnNNNNNNNNnn...",
        ".nnNNNNrrNNnnrrrrnnNNNNNNNNnn...",
        ".nnNNNNrrNNnnrrrrnnNNNNNNNNnn...",
        ".nnNNNNNNNNnnrrrrnnNNNNNNNNnn...",
        ".nnNNNNNNNNnnnrrnnnNNNNNNNNnn...",
        ".nnNNNNNNNNnnnrrnnnNNNNNNNNnn...",
        ".nnNNNNNNNNnnnnnnnnNNNNNNNNnn...",
        ".nnNNNNNNNNnnnnnnnnNNNNNNNNnn..."
      ]
    },

    // FEMALE: Clara Ashworth-Lin (Chin-length bob with straight bangs, slender shoulders, plum cardigan, jade brooch)
    claire: {
      palette: {
        ".": "#110f1f", "d": "#1d1933", "h": "#181624", "H": "#322e4a",
        "s": "#f7ccb0", "S": "#d9a586", "e": "#16121c", "m": "#cf6570",
        "v": "#4a2c59", "V": "#72448a", "t": "#ebe1f2", "g": "#2ecc71"
      },
      grid: [
        "................................",
        "..d...d...d...d...d...d...d...d.",
        "..........hhhhhhhhhhhh..........",
        "........hhHHHHHHHHHHHHhh........",
        ".......hHHHHHHHHHHHHHHHHh.......",
        "......hHHHHHhhhhhhhhHHHHHh......",
        "......hHHHhhsssssssshhHHHh......",
        "......hHHssssssssssssssHHh......",
        "......hHHssssssssssssssHHh......",
        "......hHHsswesssswessssHHh......",
        "......hHHsswesssswessssHHh......",
        "......hHHssssssssssssssHHh......",
        "......hHHssssssSSssssssHHh......",
        "......hHHssssssssssssssHHh......",
        "......hHHsssssmmmmsssssHHh......",
        "......hHHssssssssssssssHHh......",
        "......hHHHssssssssssssHHHh......",
        "......hhhh..SSSSSSSS..hhhh......",
        ".............ssssss.............",
        "........vvVV.stttts.VVvv........",
        "......vvVVVVsttttttsVVVVvv......",
        "....vvVVVVVVvttttttvVVVVVVvv....",
        "...vvVVVVVVVvttttttvVVVVVVVvv...",
        "..vvVVVVVVVVvvttttvvVVVVVVVVvv..",
        "..vvVVVVggVVvvttttvvVVVVVVVVvv..",
        "..vvVVVVggVVvvttttvvVVVVVVVVvv..",
        "..vvVVVVVVVVvvvttvvvVVVVVVVVvv..",
        "..vvVVVVVVVVvvvttvvvVVVVVVVVvv..",
        "..vvVVVVVVVVvvvvvvvvVVVVVVVVvv..",
        "..vvVVVVVVVVvvvvvvvvVVVVVVVVvv..",
        "..vvVVVVVVVVvvvvvvvvVVVVVVVVvv..",
        "..vvVVVVVVVVvvvvvvvvVVVVVVVVvv.."
      ]
    },

    // MALE: Victor Hale (Flat cap, exposed ears, full grey beard, olive work jacket & plaid shirt)
    victor: {
      palette: {
        ".": "#0d1412", "d": "#162420", "k": "#2b241e", "K": "#4a3e33",
        "s": "#dba88c", "S": "#b58267", "r": "#5c6361", "R": "#8c9491",
        "e": "#121716", "o": "#3b4734", "O": "#56694c", "f": "#8f2424",
        "F": "#1c1c1c"
      },
      grid: [
        "................................",
        ".........kkkkkkkkkkkkkk.........",
        ".......kkKKKKKKKKKKKKKKkk.......",
        "......kKKKKKKKKKKKKKKKKKKk......",
        ".....kkkkkkkkkkkkkkkkkkkkkk.....",
        "....kkkkkkkkkkkkkkkkkkkkkkkk....",
        "......ssssssssssssssssssss......",
        "......ssssssssssssssssssss......",
        ".....SssRRRRssssssssRRRRssS.....",
        ".....SsswesssssssssswessssS.....",
        ".....SssssssssssssssssssssS.....",
        "......ssssssssSSssssssssss......",
        ".....rssssssssssssssssssssr.....",
        ".....rrsssssrrrrrrrrsssssrr.....",
        ".....rrrRsssrRRRRRRrsssRrrr.....",
        ".....rrrRrrrssssssssrrrRrrr.....",
        "......rrrRrrrrrrrrrrrrRrrr......",
        ".......rrrRRRRRRRRRRRRrrr.......",
        ".........rrrrrrrrrrrrrr.........",
        "...........ssssssssss...........",
        "......ooOO..fFfFfFfF..OOoo......",
        "...ooOOOOOoofFfFfFfFooOOOOOoo...",
        ".ooOOOOOOOOoFfFfFfFfOoOOOOOOOOoo",
        "ooOOOOOOOOOOOfFfFfFfOOOOOOOOOOoo",
        "ooOOOOOOOOOOOFfFfFfFOOOOOOOOOOoo",
        "ooOOOOOOOOOOOfFfFfFfOOOOOOOOOOoo",
        "ooOOOOOOOOOOOFfFfFfFOOOOOOOOOOoo",
        "ooOOOOOOOOOOOfFfFfFfOOOOOOOOOOoo",
        "ooOOOOOOOOOOOFfFfFfFOOOOOOOOOOoo",
        "ooOOOOOOOOOOOfFfFfFfOOOOOOOOOOoo",
        "ooOOOOOOOOOOOFfFfFfFOOOOOOOOOOoo",
        "ooOOOOOOOOOOOfFfFfFfOOOOOOOOOOoo"
      ]
    },

    // ================= CASE #03 =================
    // MALE: Dr. Marcus Thorne (Short parted grey hair, exposed ears, thick glasses, trimmed beard)
    // MALE: Dr. Marcus Thorne (Short parted grey hair, thin silver glasses, clean-shaven)
    marcus: {
      palette: {
        ".": "#0b111c", "d": "#141f33", "g": "#566070", "G": "#9aa7bd",
        "s": "#f0c2a5", "S": "#c99679", "e": "#111622", "w": "#ffffff",
        "f": "#7a8ba3", "m": "#b37460", "c": "#252a36", "C": "#3d4557",
        "b": "#295480", "B": "#4385c7", "t": "#e6eef8"
      },
      grid: [
        "................................",
        "..d...d...d...d...d...d...d...d.",
        "..........gGgGgGgGgGgG..........",
        "........gGGGGGGGGGGGGGGg........",
        ".......gGGGggGGGGGGGGGGGg.......",
        ".......gGGssssssssssssGGg.......",
        ".......ggssssssssssssssgg.......",
        ".......gssssssssssssssssg.......",
        ".......gssggggssssggggssg.......",
        "......SssfffffssssfffffssS......",
        ".....SssfwessfssssfwessfssS.....",
        ".....SssfwessfsffsfwessfssS.....",
        "......sssfffffssssfffffsss......",
        ".......ssssssssSSssssssss.......",
        ".......ssssssssssssssssss.......",
        "........ssssssmmmmssssss........",
        "........ssssssssssssssss........",
        ".........SSssssssssssSS.........",
        "..........SSSSSSSSSSSS..........",
        "............ssssssss............",
        ".......ccCC..stttts..CCcc.......",
        ".....ccCCCCttbBBBBbttCCCCcc.....",
        "....ccCCCCCttbBBBBbttCCCCCcc....",
        "..ccCCCCCCCcbbBBBBbbcCCCCCCCcc..",
        ".ccCCCCCCCCcbbBBBBbbcCCCCCCCCcc.",
        ".ccCCCCCCCCcbbBBBBbbcCCCCCCCCcc.",
        ".ccCCCCCCCCcbbBBBBbbcCCCCCCCCcc.",
        ".ccCCCCCCCCcbbBBBBbbcCCCCCCCCcc.",
        ".ccCCCCCCCCcbbBBBBbbcCCCCCCCCcc.",
        ".ccCCCCCCCCcbbBBBBbbcCCCCCCCCcc.",
        ".ccCCCCCCCCcbbBBBBbbcCCCCCCCCcc.",
        ".ccCCCCCCCCcbbBBBBbbcCCCCCCCCcc."
      ]
    },

    // FEMALE: Elena Rostova (High side ponytail, slender shoulders, slate-blue blazer, rose lips)
    elena: {
      palette: {
        ".": "#0e121c", "d": "#182033", "h": "#181a24", "H": "#30354a",
        "s": "#f5cbb2", "S": "#d4a387", "e": "#12151f", "m": "#c7606b",
        "c": "#384357", "C": "#536482", "t": "#f0f5fc"
      },
      grid: [
        "...............hhhhh............",
        "..............hHHHHHh...........",
        "..........hhhhhhhhhhhh..........",
        "........hhHHHHHHHHHHHHhh........",
        ".......hHHHHHHhhhhHHHHHHhh......",
        "......hHHHssssssssssssHHhhh.....",
        "......hHHssssssssssssssHHhhh....",
        "......hhssssssssssssssssHHhhh...",
        "......hssssssssssssssssssHHhh...",
        "......hsshhhhsssssshhhhssHHhh...",
        "......hsswesssssssswessssHHhh...",
        "......hssssssssssssssssssHHhh...",
        ".......ssssssssSSssssssssHHhh...",
        ".......ssssssssssssssssssHHh....",
        "........ssssssmmmmssssss.HHh....",
        "........ssssssssssssssss.hh.....",
        ".........SSssssssssssSS.........",
        "..........SSSSSSSSSSSS..........",
        "............ssssssss............",
        "........ccCC.stttts.CCcc........",
        "......ccCCCCsttttttsCCCCcc......",
        "....ccCCCCCCcttttttcCCCCCCcc....",
        "...ccCCCCCCCCcttttcCCCCCCCCcc...",
        "..ccCCCCCCCCCcttttcCCCCCCCCCcc..",
        ".ccCCCCCCCCCCCcttcCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCcttcCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCccCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCccCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCccCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCccCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCccCCCCCCCCCCCCcc.",
        ".ccCCCCCCCCCCCCccCCCCCCCCCCCCcc."
      ]
    },

    // MALE: Gideon Mercer (Navy knit beanie, thick dark beard, yellow high-vis harbor parka)
    gideon: {
      palette: {
        ".": "#0a1017", "d": "#121d29", "k": "#1b222c", "K": "#303c4d",
        "b": "#232a34", "B": "#3b4657", "s": "#dead91", "S": "#b8866a",
        "e": "#10151c", "p": "#182636", "P": "#29405c", "y": "#ffd000",
        "Y": "#cca300"
      },
      grid: [
        "................................",
        "..........kkkkkkkkkkkk..........",
        "........kkKKKKKKKKKKKKkk........",
        ".......kKKkKKkKKkKKkKKkKK.......",
        "......kKKkKKkKKkKKkKKkKKkK......",
        "......kkkkkkkkkkkkkkkkkkkk......",
        "......kKkKkKkKkKkKkKkKkKkK......",
        "......ssssssssssssssssssss......",
        ".....SssbbbbssssssssbbbbssS.....",
        ".....SsswesssssssssswessssS.....",
        ".....SssssssssssssssssssssS.....",
        "......ssssssssSSssssssssss......",
        ".....bssssssssssssssssssssb.....",
        ".....bbsssssbbbbbbbbsssssbb.....",
        ".....bbbBsssbBBBBBBbsssbBbb.....",
        ".....bbbBbbbssssssssbbbBbbb.....",
        "......bbbBbbbbbbbbbbbbBbbb......",
        ".......bbbBBBBBBBBBBBBbbb.......",
        ".........bbbbbbbbbbbbbb.........",
        "...........ssssssssss...........",
        "......ppPP..bbbbbbbb..PPpp......",
        "...ppPPPPPPbbbbbbbbbbPPPPPPpp...",
        ".ppPPPPPPPPbbbbbbbbbbPPPPPPPPpp.",
        "ppPPPPPPPPPbbbbbbbbbbPPPPPPPPPpp",
        "pyyyyyyyyyybbbbbbbbbbpyyyyyyyyyy",
        "pYYYYYYYYYYbbbbbbbbbbpYYYYYYYYYY",
        "ppPPPPPPPPPbbbbbbbbbbPPPPPPPPPpp",
        "ppPPPPPPPPPbbbbbbbbbbPPPPPPPPPpp",
        "pyyyyyyyyyybbbbbbbbbbpyyyyyyyyyy",
        "pYYYYYYYYYYbbbbbbbbbbpYYYYYYYYYY",
        "ppPPPPPPPPPbbbbbbbbbbPPPPPPPPPpp",
        "ppPPPPPPPPPbbbbbbbbbbPPPPPPPPPpp"
      ]
    },

    // MALE: Owen Cross (Thick swept-back white hair, exposed ears, wide square jaw, brown contractor jacket)
    owen: {
      palette: {
        ".": "#120f0d", "d": "#211b17", "g": "#8a929e", "G": "#d4dce8",
        "s": "#e0af92", "S": "#ba896c", "e": "#141210", "j": "#4a3222",
        "J": "#734f36", "c": "#8f6b4e", "t": "#232730", "T": "#353b47"
      },
      grid: [
        "................................",
        "........gGgGgGgGgGgGgGgG........",
        "......gGGGGGGGGGGGGGGGGGGg......",
        ".....gGGGggGgGgGgGgGgGggGGGg....",
        ".....gGGssssssssssssssssGGg.....",
        ".....ggssssssssssssssssssgg.....",
        ".....gssssssssssssssssssssg.....",
        "....SssssssssssssssssssssssS....",
        "....SssGGGGssssssssGGGGssS....",
        "....SsswesssssssssswessssS....",
        "....SssssssssssssssssssssS....",
        ".....gssssssssSSssssssssssg.....",
        ".....ssssssssssssssssssssss.....",
        ".....ssssssssSSssSSssssssss.....",
        ".....ssssssssssssssssssssss.....",
        "......SSssssssssssssssssSS......",
        ".......SSSSSSSSSSSSSSSSSS.......",
        ".........ssssssssssssss.........",
        "........tTTTTttttttTTTTt........",
        ".....jjJJtTTTTttttTTTTtJJjj.....",
        "...jjJJJJccTTTTTTTTTTccJJJJjj...",
        ".jjJJJJJJJccTTTTTTTTccJJJJJJJjj.",
        "jjJJJJJJJJJccTTTTTTccJJJJJJJJJjj",
        "jjJJJJJJJJJJccTTTTccJJJJJJJJJJjj",
        "jjJJJJJJJJJJJccTTccJJJJJJJJJJJjj",
        "jjJJJJJJJJJJJJccccJJJJJJJJJJJJjj",
        "jjJJJJJJJJJJJJjjjjJJJJJJJJJJJJjj",
        "jjJJJJJJJJJJJJjjjjJJJJJJJJJJJJjj",
        "jjJJJJJJJJJJJJjjjjJJJJJJJJJJJJjj",
        "jjJJJJJJJJJJJJjjjjJJJJJJJJJJJJjj",
        "jjJJJJJJJJJJJJjjjjJJJJJJJJJJJJjj",
        "jjJJJJJJJJJJJJjjjjJJJJJJJJJJJJjj"
      ]
    }
  },

  getPortraitSVG(personId) {
    const key = String(personId || "").toLowerCase().trim();
    const aliasMap = { clara: "claire" };
    const resolvedKey = aliasMap[key] || key;
    const sprite = this.sprites[resolvedKey] || this.sprites.marianne;
    const h = sprite.grid.length;
    const w = sprite.grid[0].length;
    let rects = "";
    for (let y = 0; y < h; y++) {
      const row = sprite.grid[y];
      for (let x = 0; x < w; x++) {
        const ch = row[x];
        const color = sprite.palette[ch] || "#000000";
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
      }
    }
    return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  },

  // 90s Low-Res Pixel Art CCTV Renderer (160x84 internal resolution)
  startCCTVCanvas(canvasId, camIndex, camData) {
    if (this.cctvAnimId) {
      cancelAnimationFrame(this.cctvAnimId);
      this.cctvAnimId = null;
    }

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    let tick = 0;

    const render = () => {
      if (!document.body.contains(canvas)) return;
      tick++;
      const w = canvas.width;  // 160
      const h = canvas.height; // 84

      ctx.fillStyle = "#030d09";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#0d3b2b";
      ctx.fillRect(14, 12, w - 28, 1);
      ctx.fillRect(14, h - 12, w - 28, 1);
      ctx.fillRect(14, 12, 1, h - 24);
      ctx.fillRect(w - 15, 12, 1, h - 24);

      ctx.fillStyle = "#072118";
      for (let fy = h - 11; fy < h; fy += 2) {
        for (let fx = (fy % 4 === 0 ? 0 : 2); fx < w; fx += 4) {
          ctx.fillRect(fx, fy, 2, 1);
        }
      }

      const cycle = (tick % 180) / 180;

      if (camIndex === 0) {
        const x1 = Math.floor(28 + cycle * 92);
        const x2 = Math.floor(14 + cycle * 90);
        const bob = Math.floor(tick / 8) % 2;

        ctx.fillStyle = "#8affd4";
        ctx.fillRect(x1, 34 + bob, 6, 6);
        ctx.fillRect(x1 - 1, 41 + bob, 8, 14);
        ctx.fillRect(x1, 55, 2, 12 - bob);
        ctx.fillRect(x1 + 4, 55, 2, 11 + bob);
        ctx.fillStyle = "#00f0ff";
        ctx.fillRect(x1 + 7, 46 + bob, 5, 2);

        ctx.fillStyle = "#35b889";
        ctx.fillRect(x2, 32 + (1 - bob), 6, 6);
        ctx.fillRect(x2 - 2, 39 + (1 - bob), 10, 16);
        ctx.fillRect(x2, 55, 3, 12);
        ctx.fillRect(x2 + 4, 55, 3, 11);

        ctx.fillStyle = "#ffcc00";
        ctx.fillRect(x2 + 1, 41 + (1 - bob), 1, 5);
        ctx.fillRect(x2 + 4, 41 + (1 - bob), 1, 5);
        ctx.fillRect(x2 + 2, 46 + (1 - bob), 2, 2);
      } else {
        const gap = Math.floor(Math.max(0, 14 - Math.abs(cycle - 0.5) * 28));
        ctx.fillStyle = "#0b2e22";
        ctx.fillRect(52, 22, 56, 48);

        ctx.fillStyle = "#1f6e53";
        ctx.fillRect(52, 22, 27 - gap, 48);
        ctx.fillRect(81 + gap, 22, 27 - gap, 48);

        ctx.fillStyle = "#111";
        ctx.fillRect(113, 40, 6, 9);
        ctx.fillStyle = tick % 24 < 12 ? "#39ff14" : "#ffcc00";
        ctx.fillRect(115, 42, 2, 2);
      }

      ctx.fillStyle = "rgba(180, 255, 220, 0.14)";
      for (let i = 0; i < 24; i++) {
        const nx = Math.floor(Math.random() * (w / 2)) * 2;
        const ny = Math.floor(Math.random() * (h / 2)) * 2;
        ctx.fillRect(nx, ny, 2, 1);
      }

      ctx.fillStyle = tick % 40 < 25 ? "#ff2a55" : "#540b1b";
      ctx.fillRect(6, 5, 4, 4);
      ctx.fillStyle = "#39ff14";
      ctx.font = "7px monospace";
      ctx.fillText(`REC ${camData.location}`, 13, 9);
      ctx.fillText(camData.timestamp.slice(11), w - 38, 9);

      this.cctvAnimId = requestAnimationFrame(render);
    };

    render();
  },

  // 90s Pixel Art Floorplan Map for Location Channel
  drawLocationBlueprint(canvasId, activeIndex, onSelectSpot, roomLabels = ["CONSERVATION", "CORRIDOR", "SUB-VAULT B"]) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const w = canvas.width;  // 320
    const h = canvas.height; // 110

    ctx.fillStyle = "#040c1a";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#0c2347";
    for (let x = 0; x < w; x += 10) ctx.fillRect(x, 0, 1, h);
    for (let y = 0; y < h; y += 10) ctx.fillRect(0, y, w, 1);

    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 18, 92, 72);
    ctx.strokeRect(108, 40, 96, 30);
    ctx.strokeRect(204, 18, 98, 72);

    ctx.fillStyle = "#7ab8ff";
    ctx.font = "8px monospace";
    ctx.fillText(roomLabels[0] || "SECTOR A", 22, 30);
    ctx.fillText(roomLabels[1] || "SECTOR B", 122, 58);
    ctx.fillText(roomLabels[2] || "SECTOR C", 214, 30);

    const spots = [
      { x: 60, y: 62, label: "A" },
      { x: 156, y: 54, label: "B" },
      { x: 252, y: 62, label: "C" }
    ];

    spots.forEach((s, idx) => {
      const isSelected = idx === activeIndex;
      ctx.fillStyle = isSelected ? "#ffcc00" : "#ff2a55";
      ctx.fillRect(s.x - 9, s.y - 9, 18, 18);
      ctx.strokeStyle = "#000";
      ctx.strokeRect(s.x - 9, s.y - 9, 18, 18);

      ctx.fillStyle = "#000";
      ctx.font = "bold 10px monospace";
      ctx.fillText(s.label, s.x - 3, s.y + 4);
    });

    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * w;
      const clickY = ((e.clientY - rect.top) / rect.height) * h;

      spots.forEach((s, idx) => {
        if (Math.abs(clickX - s.x) <= 22 && Math.abs(clickY - s.y) <= 22) {
          onSelectSpot(idx);
        }
      });
    };
  }
};