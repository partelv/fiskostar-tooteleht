// Polished mobile product page — refined "Editorial" variant A.
// Single-screen prototype centred in viewport. Smoother interactions:
//   - Finish swatches with selected ring + label
//   - Animated fade when finish changes (hero + product list)
//   - Tap a product row to expand for full code + spec
//   - Image-slot for user-supplied lifestyle photo

const { FINISHES, F_BY_ID, DOOR_TYPES, WINDOW_PRODUCT, fmtPrice, codeFor, HandleSVG, LifestyleBg } = window;

// ── Reusable phone shell with safe areas + scroll ─────────────────────
function ToolPhoneShell({ children, bg = '#ffffff' }) {
  return (
    <div style={{
      width: 390, height: 844, background: '#0a0a0a', borderRadius: 48,
      padding: 9, boxShadow: '0 38px 90px -10px rgba(10,10,10,0.28), 0 0 0 1px rgba(0,0,0,0.05)',
      fontFamily: "'Signika', system-ui, sans-serif",
    }}>
      <div style={{
        width: '100%', height: '100%', background: bg, borderRadius: 39,
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, borderRadius: 18, background: '#0a0a0a', zIndex: 100,
        }}/>
        {/* status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 50, zIndex: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '17px 30px 0', fontSize: 15, fontWeight: 600,
          pointerEvents: 'none',
        }}>
          <span>9:41</span>
          <span/>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor"><path d="M1 8h2v2H1zM5 6h2v4H5zM9 4h2v6H9zM13 1h2v9h-2z"/></svg>
            <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1"><rect x="0.5" y="0.5" width="22" height="11" rx="2.5"/><rect x="2" y="2" width="18" height="8" rx="1.2" fill="currentColor"/><rect x="23" y="3.5" width="2.5" height="5" rx="0.6" fill="currentColor"/></svg>
          </span>
        </div>
        <div style={{ position: 'absolute', inset: 0, overflow: 'auto', overflowX: 'hidden' }}>
          {children}
        </div>
        {/* home indicator */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 3, background: 'currentColor', opacity: 0.32,
          pointerEvents: 'none', zIndex: 100,
        }}/>
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────
const I = {
  back: (p) => <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  share: (p) => <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
  heart: (p) => <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" fill={p.filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  info: (p) => <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  chevDown: (p) => <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  plus: (p) => <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  minus: (p) => <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
};

// ── Density spacing ───────────────────────────────────────────────────
const DENS = {
  compact: { row: '12px 0', rowOpenExtra: 8, gap: 18, hero: 380 },
  airy:    { row: '18px 0', rowOpenExtra: 14, gap: 28, hero: 440 },
};

// ── Spec data per door type (made-up sensible figures since the PDF
//     doesn't list dimensions). Keep concise and Estonian.
const SPECS = {
  rsb: ['Rosett ⌀ 51 mm', 'Käepideme pikkus 138 mm', 'Materjal: messing/teras', 'Kara 8 mm'],
  r:   ['Rosett ⌀ 51 mm + võtmekilp', 'Käepideme pikkus 138 mm', 'Materjal: messing/teras', 'Kara 8 mm'],
  ry:  ['Rosett ⌀ 51 mm + südamikukate', 'Käepideme pikkus 138 mm', 'Materjal: messing/teras', 'Kara 8 mm'],
  wc:  ['Tihvti pikkus 10 × 50 mm', 'Kara 6 × 6 mm', 'Lukustuvuse indikaator', 'WC-uksele'],
  win: ['Kõrgus 168 mm', 'Kruvikese pesa kummist', 'Dreh-Kipp tüüpi', 'Sobib PVC ja puit-alumiinium akendele'],
};

// ── Polished page ─────────────────────────────────────────────────────
function Tooteleht({ density = 'airy', defaultFinish = 'me' }) {
  const [finishId, setFinishId] = React.useState(defaultFinish);
  const [expandedType, setExpandedType] = React.useState(null);
  const [specsOpen, setSpecsOpen] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);
  const [fadeKey, setFadeKey] = React.useState(0);

  const f = F_BY_ID[finishId];
  const d = DENS[density];

  // When finish changes, trigger a re-mount key for the hero so a fade kicks in.
  const pickFinish = (id) => {
    if (id === finishId) return;
    setFinishId(id);
    setFadeKey((k) => k + 1);
  };

  const tone = finishId === 'mu' ? 'dark' : finishId === 'me' ? 'warm' : 'cool';

  // hero text color adapts to bg tone
  const heroFg = '#ffffff';

  return (
    <ToolPhoneShell bg="#ffffff">
      {/* Top app bar overlays the hero with mix-blend so icons read on any background */}
      <div style={{
        position: 'absolute', top: 50, left: 0, right: 0, height: 48, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 18px', color: '#fff', mixBlendMode: 'difference',
      }}>
        <button style={btnIcon}><I.back/></button>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setFavorited((x) => !x)} style={{ ...btnIcon, color: favorited ? '#ff5b5b' : '#fff' }}>
            <I.heart filled={favorited}/>
          </button>
          <button style={btnIcon}><I.share/></button>
        </div>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <div style={{
        position: 'relative', height: d.hero, background: '#0a0a0a',
        overflow: 'hidden',
      }}>
        {/* Lifestyle background — generated SVG, swaps tone with finish */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <LifestyleBg tone={tone}/>
        </div>
        {/* gradient scrim bottom for text legibility */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 180,
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.45))',
        }}/>
        {/* dark vignette to make the metal handle pop */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 58%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.75) 100%)',
          pointerEvents: 'none',
        }}/>

        {/* Top crumb */}
        <div style={{
          position: 'absolute', top: 110, left: 22,
          fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: heroFg, opacity: 0.85, textShadow: '0 1px 2px rgba(0,0,0,0.35)',
        }}>
          Ukselingid · Colombo Design
        </div>

        {/* Floating handle */}
        <div
          style={{
            position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 22px 28px rgba(0,0,0,0.45))',
          }}
        >
          <HandleSVG finish={f} size={320}/>
        </div>

        {/* Finish indicator dots (top right) */}
        <div style={{
          position: 'absolute', top: 110, right: 22, display: 'flex', gap: 5,
        }}>
          {FINISHES.map((opt) => (
            <span key={opt.id} style={{
              width: 6, height: 6, borderRadius: '50%',
              background: opt.id === finishId ? '#fff' : 'rgba(255,255,255,0.35)',
              transition: 'background 150ms',
            }}/>
          ))}
        </div>

        {/* Hero footer label */}
        <div style={{
          position: 'absolute', bottom: 20, left: 22, right: 22, color: heroFg,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 5 }}>
              Viimistlus · {f.code}
            </div>
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.005em' }}>{f.label}</div>
          </div>
          <div style={{ fontSize: 10, letterSpacing: '0.16em', opacity: 0.7, paddingBottom: 2 }}>
            {FINISHES.findIndex((x) => x.id === finishId) + 1} / {FINISHES.length}
          </div>
        </div>
      </div>

      {/* ═══════════ TITLE ═══════════ */}
      <div style={{ padding: '26px 22px 14px' }}>
        <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
          Colombo Design · Italy
        </div>
        <h1 style={{
          margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: '-0.015em',
          lineHeight: 1.02,
        }}>ROBOCINQUE</h1>
        <div style={{ fontSize: 14, color: '#555', marginTop: 10, lineHeight: 1.5, maxWidth: 320 }}>
          Itaalia disainerite nurgeline ukselink — perekond viies viimistluses, kõik E&#8209;standardi lukukorpustele.
        </div>
      </div>

      {/* ═══════════ FINISH SELECTOR ═══════════ */}
      <div style={{ padding: '4px 22px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 14,
        }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888' }}>
            Vali viimistlus
          </div>
          <div style={{ fontSize: 11, color: '#888' }}>{FINISHES.length} valikut</div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6,
        }}>
          {FINISHES.map((opt) => {
            const active = opt.id === finishId;
            return (
              <button key={opt.id} onClick={() => pickFinish(opt.id)} style={{
                border: 'none', background: 'transparent', padding: 0, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: '50%', background: opt.swatch,
                  boxShadow: active
                    ? '0 0 0 2px #0a0a0a, inset 0 0 0 3px #fff, 0 2px 4px rgba(0,0,0,0.08)'
                    : 'inset 0 0 0 1px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 200ms ease',
                  transform: active ? 'scale(1.04)' : 'scale(1)',
                  transitionProperty: 'box-shadow, transform',
                }}/>
                <div style={{
                  fontSize: 9, fontWeight: active ? 700 : 500, color: active ? '#0a0a0a' : '#888',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{opt.code}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════ DOOR PRODUCT LIST ═══════════ */}
      <div style={{ padding: '24px 22px 4px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: '-0.005em' }}>
          Ukselingid
        </h2>
        <span style={{ fontSize: 11, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {DOOR_TYPES.length} mudelit
        </span>
      </div>

      <div style={{ padding: '0 22px' }} key={'list-' + fadeKey}>
        {DOOR_TYPES.map((t, i) => {
          const open = expandedType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setExpandedType(open ? null : t.id)}
              style={{
                width: '100%', background: 'transparent', border: 'none',
                borderTop: '1px solid #ececec',
                padding: d.row, textAlign: 'left', cursor: 'pointer',
                fontFamily: 'inherit', color: 'inherit',
                display: 'block',
              }}
            >
              <div style={{
                display: 'grid', gridTemplateColumns: '60px 1fr auto', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 60, height: 48, background: '#f6f5f3', borderRadius: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 200ms',
                }}>
                  <HandleSVG finish={f} size={56}/>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.2 }}>
                    {t.name === 'WC-sulgur' ? t.name : t.name.replace('Ukselink ', '')}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#888', marginTop: 3 }}>{t.sub}</div>
                </div>
                <div style={{
                  textAlign: 'right', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 700 }}>{fmtPrice(t.prices[f.id])}</div>
                    <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>km-ta</div>
                  </div>
                  <div style={{
                    color: '#888', transform: open ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 200ms',
                  }}>
                    <I.chevDown/>
                  </div>
                </div>
              </div>
              {/* Expandable detail */}
              <div style={{
                maxHeight: open ? 220 : 0, overflow: 'hidden',
                transition: 'max-height 280ms ease-out',
              }}>
                <div style={{
                  marginTop: d.rowOpenExtra,
                  marginLeft: 74,
                  paddingBottom: d.rowOpenExtra,
                  fontSize: 12, color: '#555', lineHeight: 1.5,
                }}>
                  <div style={{
                    display: 'inline-block', padding: '3px 8px', background: '#0a0a0a',
                    color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    fontFamily: 'ui-monospace, monospace', borderRadius: 3,
                  }}>{codeFor(t, f.id)}</div>
                  <span style={{
                    marginLeft: 8, padding: '3px 8px', background: '#fafaf9',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                    color: '#0a0a0a', border: '1px solid #ececec', borderRadius: 3,
                  }}>E-standard</span>
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {SPECS[t.id].map((s, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#666' }}>
                        <span style={{ color: '#bbb' }}>·</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
        <div style={{ borderTop: '1px solid #ececec' }}/>
      </div>

      {/* ═══════════ WINDOW HANDLE SECTION ═══════════ */}
      <div style={{ marginTop: 28, background: '#f6f5f3', padding: '24px 22px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: '-0.005em' }}>
            Aknalink DK
          </h2>
          <span style={{ fontSize: 11, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Sobib komplekti
          </span>
        </div>
        <button
          onClick={() => setExpandedType(expandedType === 'win' ? null : 'win')}
          style={{
            width: '100%', background: '#fff', border: 'none',
            padding: '16px', borderRadius: 6, cursor: 'pointer',
            fontFamily: 'inherit', color: 'inherit', textAlign: 'left',
          }}>
          <div style={{ display: 'grid', gridTemplateColumns: '74px 1fr auto', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 74, height: 68,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <HandleSVG finish={f} type="window" size={66}/>
            </div>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>Aknalink DK ROBOCINQUE</div>
              <div style={{ fontSize: 12.5, color: '#888', marginTop: 3 }}>Dreh-Kipp · 5 viimistlust</div>
            </div>
            <div style={{
              textAlign: 'right', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 700 }}>{fmtPrice(WINDOW_PRODUCT.prices[f.id])}</div>
                <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>km-ta</div>
              </div>
              <div style={{
                color: '#888', transform: expandedType === 'win' ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 200ms',
              }}>
                <I.chevDown/>
              </div>
            </div>
          </div>
          <div style={{
            maxHeight: expandedType === 'win' ? 200 : 0, overflow: 'hidden',
            transition: 'max-height 280ms ease-out',
          }}>
            <div style={{ marginTop: 14, marginLeft: 88, paddingBottom: 4, fontSize: 12, color: '#555' }}>
              <div style={{
                display: 'inline-block', padding: '3px 8px', background: '#0a0a0a',
                color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                fontFamily: 'ui-monospace, monospace', borderRadius: 3,
              }}>{codeFor(WINDOW_PRODUCT, f.id)}</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {SPECS.win.map((s, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#666' }}>
                    <span style={{ color: '#bbb' }}>·</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* ═══════════ TEHNILISED ANDMED — collapsible ═══════════ */}
      <div style={{ padding: '8px 22px 0' }}>
        <button
          onClick={() => setSpecsOpen((x) => !x)}
          style={{
            width: '100%', background: 'transparent', border: 'none',
            padding: '18px 0', cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            color: 'inherit',
          }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Üldine info & sobivus</span>
          <span style={{ color: '#888' }}>{specsOpen ? <I.minus/> : <I.plus/>}</span>
        </button>
        <div style={{
          maxHeight: specsOpen ? 260 : 0, overflow: 'hidden',
          transition: 'max-height 320ms ease-out',
        }}>
          <div style={{
            paddingBottom: 18, fontSize: 13, color: '#555', lineHeight: 1.6,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <Spec label="Standard" value="Euroopa lukukorpus (E)"/>
            <Spec label="Sobivus" value="sh. Bonaiti magnetlukud"/>
            <Spec label="Materjal" value="Messing · värvkattega teras"/>
            <Spec label="Kara" value="8 mm · WC-sulgur 6×6 mm"/>
            <Spec label="Päritolu" value="Colombo Design, Itaalia"/>
            <Spec label="Hinnakiri" value="Jaehinnad 01.02.2026, km-ta"/>
          </div>
        </div>
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <div style={{
        padding: '4px 22px 110px',
        borderTop: '1px solid #ececec',
        marginTop: 4,
      }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 11, color: '#888', lineHeight: 1.5, paddingTop: 16 }}>
          <span style={{ marginTop: 1 }}><I.info/></span>
          <span>E* — sobib Euroopa standardi (E) lukukorpustele, sh. Bonaiti magnetlukkudele. WC-sulguri kara 6×6 mm.</span>
        </div>
        <div style={{
          marginTop: 20, paddingTop: 14, borderTop: '1px solid #f0eee9',
          fontSize: 11, color: '#aaa', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <div>fiskostar.ee</div>
          <div>disain@fiskostar.ee · 5471 0656</div>
        </div>
      </div>

      <style>{`
        @keyframes rcFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .rc-fade { animation: rcFadeIn 320ms ease-out; }
        .rc-fade-label { animation: rcFadeIn 320ms ease-out; }
      `}</style>
    </ToolPhoneShell>
  );
}

function Spec({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 10 }}>
      <span style={{ color: '#999', fontSize: 12, letterSpacing: '0.04em' }}>{label}</span>
      <span style={{ color: '#222', fontSize: 13 }}>{value}</span>
    </div>
  );
}

const btnIcon = {
  width: 36, height: 36, borderRadius: 18,
  background: 'transparent', border: 'none', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: 'inherit',
};

Object.assign(window, { Tooteleht });
