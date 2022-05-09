import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { IconItem, iconsList, SearchLoupe } from 'suivi-icons'
import { useSnackbar } from 'notistack'
import InputBase from '@material-ui/core/InputBase'
import clsx from 'clsx'

const App: React.FC<{}> = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [iconsNames, setIconsNames] = useState<readonly string[]>(iconsList)
  const [selected, setSelected] = useState<string | null>(null)
  const selectIcon = (i: number) => {
    setSelected(iconsNames[i])
    // copy to clipboard
    const code = `import { ${iconsNames[i]} } from "suivi-icons"`
    navigator.clipboard.writeText(code)
    // open snakbar
    enqueueSnackbar(`Successfully Copied ${iconsNames[i]}`, {
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      preventDuplicate: true,
      autoHideDuration: 1000
    })
  }

  const onNewWrittenTxt = (newTxt: string) => {
    if (newTxt !== ' ' && newTxt !== '') {
      const newIconsNames = iconsList.filter((x) =>
        x.toUpperCase().includes(newTxt.toUpperCase())
      )
      setIconsNames(newIconsNames)
    } else {
      setIconsNames(iconsList)
    }
  }

  return (
    <div className='iconsContainer'>
      <Typography className='title' variant='h4' gutterBottom>
        Suivi Icons
      </Typography>
      <div className='UpperSide flexRow'>
        <Typography
          className='sub-title'
          variant='h5'
          gutterBottom
          color='textSecondary'
        >
          Icons
        </Typography>
        <SearchBlock onChange={onNewWrittenTxt} />
        <Typography variant='caption'>{iconsNames.length} icons</Typography>
      </div>
      <IconsListBlock
        iconsNames={iconsNames}
        selectIcon={selectIcon}
        selected={selected}
        // iconsObjsArr={iconsObjsArr}
      />
    </div>
  )
}

interface ISearchBlockProps {
  onChange: (writtenTxt: string) => void
}

const SearchBlock: React.FC<ISearchBlockProps> = ({ onChange }) => {
  return (
    <Paper className='searchBlock'>
      <SearchLoupe fontSize='24' color='gray' />
      <InputBase
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search icon'
        inputProps={{ 'aria-label': 'search suivi icons' }}
      />
    </Paper>
  )
}

interface IIconsListProps {
  iconsNames: readonly string[]
  // iconsObjsArr: React.ElementType[]
  selected: string | null
  selectIcon: (i: number) => void
}

const IconsListBlock: React.FC<IIconsListProps> = ({
  iconsNames,
  // iconsObjsArr,
  selected,
  selectIcon
}) => {
  return (
    <div className='IconsListBlock flexRow'>
      {iconsNames.map((x, i) => (
        <div
          key={iconsNames[i]}
          className={clsx(
            'IconLabelContainer',
            'flexColumnCentredChilds',
            selected === iconsNames[i] && 'selectedIcon'
          )}
          onClick={() => selectIcon(i)}
        >
          <Paper className='iconPaper flexColumnCentredChilds'>
            <IconItem iconId={x} fontSize='50' />
          </Paper>
          <Typography className='iconLabel txtEllipsis' variant='caption'>
            {iconsNames[i]}
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default App
