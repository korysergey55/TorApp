// import React from 'react'
// import reactCSS from 'reactcss'
// import { SketchPicker } from 'react-color'
// import style from './styles.module.scss'
// import { observer } from 'mobx-react'

// class ColorPiker extends React.Component {
//   state = {
//     displayColorPicker: false,
//     color: {
//       r: '241',
//       g: '112',
//       b: '19',
//       a: '1',
//     },
//   }

//   handleClick = () => {
//     this.setState({ displayColorPicker: !this.state.displayColorPicker })
//   }

//   handleClose = () => {
//     this.setState({ displayColorPicker: false })
//   }

//   handleChange = (color) => {
//     this.setState({ color: color.rgb })
//     console.log(color)
//     this.props.onChangeColor(color.hex, this.props.name)
//   }

//   render() {
//     const styles = reactCSS({
//       default: {
//         color: {
//           width: '36px',
//           height: '14px',
//           borderRadius: '2px',
//           background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
//         },
//       }
//     })

//     return (
//       <div>
//         <div className={style.swatch} onClick={this.handleClick}>
//           <div style={styles.color} />
//         </div>
//         {this.state.displayColorPicker ? (
//           <div className={style.popover}>
//             <div className={style.cover} onClick={this.handleClose} />
//             <SketchPicker
//               color={this.state.color}
//               onChange={this.handleChange}
//             />
//           </div>
//         ) : null}
//       </div>
//     )
//   }
// }

// export default observer(ColorPiker)

import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import style from './styles.module.scss'
import { observer } from 'mobx-react'
import { useStore } from 'stores'

const ColorPiker = observer(({ name }) => {
  const { CreateCompanyStore } = useStore()
  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  })

  const handleClick = () => {
    setState(prev => ({ ...prev, displayColorPicker: !state.displayColorPicker }))
  }

  const handleClose = () => {
    setState(prev => ({ ...prev, displayColorPicker: false }))
  }

  const handleChange = color => {
    setState(prev => ({ ...prev, color: color.rgb }))
    CreateCompanyStore.setColorsApp(name, color.hex)
  }

  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`,
      },
    },
  })

  return (
    <div>
      <div className={style.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {state.displayColorPicker ? (
        <div className={style.popover}>
          <div className={style.cover} onClick={handleClose} />
          <SketchPicker color={state.color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  )
})

export default ColorPiker
