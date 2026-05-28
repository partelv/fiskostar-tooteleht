// v2 — Clean white-hero edition.
// Same product data + behaviour as Tooteleht. The hero now uses a pure
// white backdrop so real product photos (which are also on white) drop in
// seamlessly. UI palette evolves to a museum-display feel: graphite outer
// frame, white interior, soft warm sand band for the Aknalink section.

const { FINISHES, F_BY_ID, DOOR_TYPES, WINDOW_PRODUCT, fmtPrice, codeFor, HandleSVG } = window;

// ── Phone shell ───────────────────────────────────────────────────────
function ToolPhoneShellV2({ children, bg = '#ffffff' }) {
  return (
    <div style={{
      width: 390, height: 844, background: '#0a0a0a', borderRadius: 48,
      padding: 9,
      boxShadow: '0 38px 90px -10px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.05)',
      fontFamily: "'Signika', system-ui, sans-serif",
    }}>
      <div style={{
        width: '100%', height: '100%', background: bg, borderRadius: 39,
        overflow: 'hidden', position: 'relative',
      }}>
        {/* dynamic island */}
        <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, borderRadius: 18, background: '#0a0a0a', zIndex: 100,
        }}/>
        {/* status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 50, zIndex: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '17px 30px 0', fontSize: 15, fontWeight: 600,
          pointerEvents: 'none', color: '#0a0a0a',
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
          width: 134, height: 5, borderRadius: 3, background: '#0a0a0a', opacity: 0.32,
          pointerEvents: 'none', zIndex: 100,
        }}/>
      </div>
    </div>
  );
}

// ── Icons (identical to v1) ──────────────────────────────────────────
const I2 = {
  back: (p) => <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  share: (p) => <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
  heart: (p) => <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" fill={p.filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  info: (p) => <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  chevDown: (p) => <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  plus: (p) => <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  minus: (p) => <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
};

// ── Density ──────────────────────────────────────────────────────────
const DENS_V2 = {
  compact: { row: '12px 0', rowOpenExtra: 8, gap: 18, hero: 400 },
  airy:    { row: '18px 0', rowOpenExtra: 14, gap: 28, hero: 460 },
};

// ── Spec data per door type ─────────────────────────────────────────
const SPECS_V2 = {
  rsb: ['Rosett ⌀ 51 mm', 'Käepideme pikkus 138 mm', 'Materjal: messing/teras', 'Kara 8 mm'],
  r:   ['Rosett ⌀ 51 mm + võtmekilp', 'Käepideme pikkus 138 mm', 'Materjal: messing/teras', 'Kara 8 mm'],
  ry:  ['Rosett ⌀ 51 mm + südamikukate', 'Käepideme pikkus 138 mm', 'Materjal: messing/teras', 'Kara 8 mm'],
  wc:  ['Tihvti pikkus 10 × 50 mm', 'Kara 6 × 6 mm', 'Lukustuvuse indikaator', 'WC-uksele'],
  win: ['Kõrgus 168 mm', 'Kruvikese pesa kummist', 'Dreh-Kipp tüüpi', 'Sobib PVC ja puit-alumiinium akendele'],
};

// ── Polished page v2 ─────────────────────────────────────────────────
function ToolelehtV2({ density = 'airy', defaultFinish = 'me' }) {
  const [finishId, setFinishId] = React.useState(defaultFinish);
  const [expandedType, setExpandedType] = React.useState(null);
  const [specsOpen, setSpecsOpen] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);
  const [fadeKey, setFadeKey] = React.useState(0);

  const f = F_BY_ID[finishId];
  const d = DENS_V2[density];

  const pickFinish = (id) => {
    if (id === finishId) return;
    setFinishId(id);
    setFadeKey((k) => k + 1);
  };

  return (
    <ToolPhoneShellV2 bg="#ffffff">
      {/* Top app bar — dark icons on white */}
      <div style={{
        position: 'absolute', top: 50, left: 0, right: 0, height: 48, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 18px', color: '#0a0a0a',
      }}>
        <button style={btnIconV2}><I2.back/></button>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setFavorited((x) => !x)} style={{ ...btnIconV2, color: favorited ? '#c14040' : '#0a0a0a' }}>
            <I2.heart filled={favorited}/>
          </button>
          <button style={btnIconV2}><I2.share/></button>
        </div>
      </div>

      {/* ═══════════ HERO — pure white backdrop, matches product photos ═══════════ */}
      <div style={{
        position: 'relative', height: d.hero, background: '#ffffff',
        overflow: 'hidden',
      }}>
        {/* Top crumb */}
        <div style={{
          position: 'absolute', top: 110, left: 22, zIndex: 2,
          fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#8a8275',
        }}>
          Ukselingid · Colombo Design
        </div>

        {/* Finish indicator dots */}
        <div style={{
          position: 'absolute', top: 110, right: 22, display: 'flex', gap: 5, zIndex: 2,
        }}>
          {FINISHES.map((opt) => (
            <span key={opt.id} style={{
              width: 6, height: 6, borderRadius: '50%',
              background: opt.id === finishId ? '#0a0a0a' : 'rgba(10,10,10,0.18)',
              transition: 'background 150ms',
            }}/>
          ))}
        </div>

        {/* Floating product — photo when available, SVG fallback */}
        <div
          key={'hero-' + fadeKey}
          className="rc-fade-v2"
          style={{
            position: 'absolute', left: '50%', top: '54%', transform: 'translate(-50%, -50%)',
            zIndex: 3,
          }}
        >
          {f.photo ? (
            <img
              src={f.photo}
              alt={`ROBOCINQUE — ${f.label}`}
              style={{ width: 320, height: 'auto', display: 'block', mixBlendMode: 'multiply' }}
            />
          ) : (
            <HandleSVG finish={f} size={320}/>
          )}
        </div>

      </div>

      {/* ═══════════ FINISH LABEL STRIP — grey band between photo and title ═══════════ */}
      <div style={{
        background: '#f2f2f2', padding: '14px 22px', color: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8a8275' }}>
            Viimistlus · {f.code}
          </span>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em' }}>{f.label}</span>
        </div>
        <div style={{ fontSize: 10, letterSpacing: '0.16em', color: '#8a8275' }}>
          {FINISHES.findIndex((x) => x.id === finishId) + 1} / {FINISHES.length}
        </div>
      </div>

      {/* ═══════════ TITLE ═══════════ */}
      <div style={{ padding: '26px 22px 14px' }}>
        <div style={{ fontSize: 11, color: '#8a8275', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
          Colombo Design · Italy
        </div>
        <h1 style={{
          margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: '-0.015em',
          lineHeight: 1.02, color: '#0a0a0a',
        }}>ROBOCINQUE</h1>
        <div style={{ fontSize: 14, color: '#5a5448', marginTop: 10, lineHeight: 1.5, maxWidth: 320 }}>
          Itaalia disainerite nurgeline ukselink — perekond viies viimistluses, kõik E&#8209;standardi lukukorpustele.
        </div>
      </div>

      {/* ═══════════ FINISH SELECTOR ═══════════ */}
      <div style={{ background: '#f2f2f2', padding: '20px 22px 22px', marginTop: 8 }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 14,
        }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8a8275' }}>
            Vali viimistlus
          </div>
          <div style={{ fontSize: 11, color: '#8a8275' }}>{FINISHES.length} valikut</div>
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
                    ? '0 0 0 2px #0a0a0a, inset 0 0 0 3px #f2f2f2, 0 2px 4px rgba(0,0,0,0.08)'
                    : 'inset 0 0 0 1px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 200ms ease, transform 200ms ease',
                  transform: active ? 'scale(1.04)' : 'scale(1)',
                }}/>
                <div style={{
                  fontSize: 9, fontWeight: active ? 700 : 500, color: active ? '#0a0a0a' : '#8a8275',
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
        <span style={{ fontSize: 11, color: '#8a8275', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {DOOR_TYPES.length} mudelit
        </span>
      </div>

      <div style={{ padding: '0 22px' }} key={'list-' + fadeKey}>
        {DOOR_TYPES.map((t) => {
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
                  width: 60, height: 48, background: '#ffffff', borderRadius: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {f.photo ? (
                    <img src={f.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}/>
                  ) : (
                    <HandleSVG finish={f} size={56}/>
                  )}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.2 }}>
                    {t.name === 'WC-sulgur' ? t.name : t.name.replace('Ukselink ', '')}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#8a8275', marginTop: 3 }}>{t.sub}</div>
                </div>
                <div style={{
                  textAlign: 'right', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 700 }}>{fmtPrice(t.prices[f.id])}</div>
                    <div style={{ fontSize: 10, color: '#a89f8c', marginTop: 2 }}>km-ta</div>
                  </div>
                  <div style={{
                    color: '#8a8275', transform: open ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 200ms',
                  }}>
                    <I2.chevDown/>
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
                  fontSize: 12, color: '#5a5448', lineHeight: 1.5,
                }}>
                  <div style={{
                    display: 'inline-block', padding: '3px 8px', background: '#0a0a0a',
                    color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    fontFamily: 'ui-monospace, monospace', borderRadius: 3,
                  }}>{codeFor(t, f.id)}</div>
                  <span style={{
                    marginLeft: 8, padding: '3px 8px', background: '#faf8f3',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                    color: '#0a0a0a', border: '1px solid #f0ece2', borderRadius: 3,
                  }}>E-standard</span>
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {SPECS_V2[t.id].map((s, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#6b6453' }}>
                        <span style={{ color: '#c8bfa9' }}>·</span>
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

      {/* ═══════════ WINDOW HANDLE SECTION — warm sand band ═══════════ */}
      <div style={{ marginTop: 28, background: '#f4efe4', padding: '24px 22px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: '-0.005em' }}>
            Aknalink DK
          </h2>
          <span style={{ fontSize: 11, color: '#8a8275', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
              <div style={{ fontSize: 12.5, color: '#8a8275', marginTop: 3 }}>Dreh-Kipp · 5 viimistlust</div>
            </div>
            <div style={{
              textAlign: 'right', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 700 }}>{fmtPrice(WINDOW_PRODUCT.prices[f.id])}</div>
                <div style={{ fontSize: 10, color: '#a89f8c', marginTop: 2 }}>km-ta</div>
              </div>
              <div style={{
                color: '#8a8275', transform: expandedType === 'win' ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 200ms',
              }}>
                <I2.chevDown/>
              </div>
            </div>
          </div>
          <div style={{
            maxHeight: expandedType === 'win' ? 200 : 0, overflow: 'hidden',
            transition: 'max-height 280ms ease-out',
          }}>
            <div style={{ marginTop: 14, marginLeft: 88, paddingBottom: 4, fontSize: 12, color: '#5a5448' }}>
              <div style={{
                display: 'inline-block', padding: '3px 8px', background: '#0a0a0a',
                color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                fontFamily: 'ui-monospace, monospace', borderRadius: 3,
              }}>{codeFor(WINDOW_PRODUCT, f.id)}</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {SPECS_V2.win.map((s, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#6b6453' }}>
                    <span style={{ color: '#c8bfa9' }}>·</span>
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
          <span style={{ color: '#8a8275' }}>{specsOpen ? <I2.minus/> : <I2.plus/>}</span>
        </button>
        <div style={{
          maxHeight: specsOpen ? 260 : 0, overflow: 'hidden',
          transition: 'max-height 320ms ease-out',
        }}>
          <div style={{
            paddingBottom: 18, fontSize: 13, color: '#5a5448', lineHeight: 1.6,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <SpecV2 label="Standard" value="Euroopa lukukorpus (E)"/>
            <SpecV2 label="Sobivus" value="sh. Bonaiti magnetlukud"/>
            <SpecV2 label="Materjal" value="Messing · värvkattega teras"/>
            <SpecV2 label="Kara" value="8 mm · WC-sulgur 6×6 mm"/>
            <SpecV2 label="Päritolu" value="Colombo Design, Itaalia"/>
            <SpecV2 label="Hinnakiri" value="Jaehinnad 01.02.2026, km-ta"/>
          </div>
        </div>
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <div style={{
        padding: '4px 22px 110px',
        borderTop: '1px solid #ececec',
        marginTop: 4,
      }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 11, color: '#8a8275', lineHeight: 1.5, paddingTop: 16 }}>
          <span style={{ marginTop: 1 }}><I2.info/></span>
          <span>E* — sobib Euroopa standardi (E) lukukorpustele, sh. Bonaiti magnetlukkudele. WC-sulguri kara 6×6 mm.</span>
        </div>
        <div style={{
          marginTop: 20, paddingTop: 14, borderTop: '1px solid #f0ece2',
          fontSize: 11, color: '#a89f8c', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <div>fiskostar.ee</div>
          <div>disain@fiskostar.ee · 5471 0656</div>
        </div>
      </div>

      <style>{`
        @keyframes rcFadeInV2 {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.985); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .rc-fade-v2 { animation: rcFadeInV2 320ms ease-out; }
      `}</style>
    </ToolPhoneShellV2>
  );
}

function SpecV2({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 10 }}>
      <span style={{ color: '#a89f8c', fontSize: 12, letterSpacing: '0.04em' }}>{label}</span>
      <span style={{ color: '#222', fontSize: 13 }}>{value}</span>
    </div>
  );
}

const btnIconV2 = {
  width: 36, height: 36, borderRadius: 18,
  background: 'rgba(255,255,255,0.7)', border: 'none', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: 'inherit',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
};

Object.assign(window, { ToolelehtV2 });
