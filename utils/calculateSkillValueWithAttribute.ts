import type { CharacterInfo } from '~/types'

export default function calculateSkillValueWithAttribute(
  skillValue: string,
  attributeName: string,
  characterInfo: CharacterInfo | null = null
) {
  if (!characterInfo) {
    return parseInt(skillValue)
  }

  const attributeData = characterInfo.attributes.find((attr) => attr.key === attributeName)

  if (!attributeData) {
    return parseInt(skillValue)
  }

  const skill = parseInt(skillValue)
  const attribute = parseInt(attributeData.value)

  return skill + attribute
}
