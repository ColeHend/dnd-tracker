import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'


function SpellCollapsible({spell}) {
  return (
    <div style={{width: '100%', height: 'max-content', wordWrap: 'normal', font: 'inherit', fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>
      <h1>
        {spell.spell_title}
      </h1>
      <br />
      <div className='spellInfoWrapper'>
        <div className='SpellInfo'>{/* Level */}
          <label className='spellTag' htmlFor="spellLevel">
            Level:
          </label>
          <div id="spellLevel">
            {
              typeof spell.spell_subhead === 'object' ?
                <>{spell.spell_subhead.level} </>
                : 'No level'
            }
          </div>
        </div>
        <div className='SpellInfo'>{/* School */}
          <label className='spellTag' htmlFor="spellSchool">
            School:
          </label>
          <div id="spellSchool">
            {
              typeof spell.spell_subhead === "object" ?
                <>{spell.spell_subhead.school}</>
                : 'no school'
            }
          </div>
        </div>
        <div className='SpellInfo'>{/* Casting Time */}
          <label className='spellTag' htmlFor="spellCasting_Time">
            Casting Time:
          </label>
          <div id="spellCasting_Time">
            {
              typeof spell.spell_subhead === "object" ?
                <>{spell.spell_subhead.casting_time}</>
                : 'no Casting time'
            }
          </div>
        </div>
        <div className='SpellInfo'>{/* Range */}
          <label className='spellTag' htmlFor="spellRange">
            Range:
          </label>
          <div id="spellRange">
            {
              typeof spell.spell_subhead === "object" ?
                <> {spell.spell_subhead.range} </>
                : "no Range"
            }
          </div>
        </div>
        <div className='SpellInfo'>{/* Components */}
          <label className='spellTag' htmlFor="spellComponents">
            Components:
          </label>
          <div id="spellComponents">
            {
              typeof spell.spell_subhead === "object" ?
                spell.spell_subhead.components?.join(", ")
                : "no components"
            }
          </div>
        </div>
        <div className='SpellInfo'>{/* Material Components if any */}
          <label className='spellTag' htmlFor="spellMaterial">
            Material Components:
          </label>
          <div id="spellMaterial">
            {
              typeof spell.spell_subhead === "object" ?
                <>{spell.spell_subhead.material}</>
                : "no material components"
            }
          </div>
        </div>
        <div className='SpellInfo'>{/* Duration */}
          <label className='spellTag' htmlFor="spellDuration">
            Duration:
          </label>
          <div id="spellDuration">
            {
              spell.spell_subhead.concentration ?
                "Concentration "
                : ""
            }
            {
              typeof spell.spell_subhead === "object" ?
                <>{spell.spell_subhead.duration}</>
                : "no Duration"
            }
          </div>
        </div>
        <div className='SpellInfo'>{/* Classes that can use the spell */}
          <label className='spellTag' htmlFor="spellClasses">
            Classes:
          </label>
          <div id="spellClasses">
            {
              typeof spell.spell_subhead === "object" ?
                spell.spell_subhead.classes?.join(", ")
                : "no spell classes"
            }
          </div>
        </div>
        <br />{/*---v-Is Ritual-v-----*/}
        <div className='SpellInfo'>
            <div className='spellTag' id='spellRitual'>
              {
                spell.spell_subhead.ritual ? 
                "ritual"
                : ""
              }
            </div>  
        </div>
      </div>
      <br />
      <br />
      <div>{/* --v---Spell Desc----v---- */}
      {
        typeof spell.spell_desc === 'string' ?
        <ReactMarkdown remarkPlugins={[gfm]}>{spell.spell_desc}</ReactMarkdown> :
        null
      }
        
      </div>
      <div>{/* ---v--Spell at Higher Levels----v */}
        {
          typeof spell.spell_subhead === "object" ?
            <ReactMarkdown remarkPlugins={[gfm]}>{spell.spell_subhead.higher_level?.join("\n")}</ReactMarkdown>
            : 'no spell at higher level desc'
        }
      </div>
    </div>
  )
}

export default SpellCollapsible