import React from 'react'
export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  nameChange (e, classNameIndex, classIndex) {
    this.EditClassNameChange(e.target.value, 'name', classNameIndex, classIndex)
  }

  valueChange (e, classNameIndex, classIndex) {
    this.EditClassNameChange(e.target.value, 'value', classNameIndex, classIndex)
  }

  classNameChange (e, classNameIndex) {
    this.EditClassNameChange(e.target.value, 'class', classNameIndex)
  }

  classNameDelete (classNameIndex, classIndex) {
    this.EditClassNameChange('', 'delete', classNameIndex, classIndex)
  }

  classNameAdd (classNameIndex) {
    this.EditClassNameChange('', 'add', classNameIndex)
  }
  classNameAdd2 (classNameIndex) {
    this.EditClassNameChange('', 'add2', classNameIndex)
  }

  classNameDelete2 (classNameIndex) {
    this.EditClassNameChange('', 'delete2', classNameIndex)
  }

  EditClassNameChange (value, type, classNameIndex, classIndex) {
    this.props.saveToCache()
    let classInfo = this.props.node.classInfo
    switch (type) {
      case 'class':
        classInfo[classNameIndex].name = value;
        break;
      case 'name':
        classInfo[classNameIndex].styleArr[classIndex].name = value;
        break;
      case 'value':
        classInfo[classNameIndex].styleArr[classIndex].value = value;
        break;
      case 'delete':
        classInfo[classNameIndex].styleArr.splice(classIndex, 1);
        break;
      case 'add':
        classInfo[classNameIndex].styleArr.push({name: '', value: ''})
        break;
      case 'add2':
        classInfo.splice(classNameIndex + 1, 0, {name: 'no-name', styleArr: [{name: '', value: ''}]});
        break;
      case 'add3':
        let arr = JSON.parse(JSON.stringify(value))
        // if (this.last !== arr) {
        //   this.last = arr
        // } else {
        //   console.log('hehe')
        // }
        // arr.forEach((item, index) => {
        //   classInfo.push(item)
        // })

        this.props.node.classInfo = classInfo.concat(arr)
        break;
      case 'delete2':
        classInfo.splice(classNameIndex, 1);
        break;
    }
    this.props.updateClassName()
  }

  renderOneClass (className, classNameIndex) {
    let arr = className.map((oneClass, classIndex) => {
      return <div className={'out'} key={classIndex}>
        <input onChange={(e) => {this.nameChange(e, classNameIndex, classIndex)}} value={oneClass.name} />
        <input onChange={(e) => {this.valueChange(e, classNameIndex, classIndex)}} value={oneClass.value} />
        <div style={{marginLeft: '30px'}} onClick={() => {this.classNameDelete(classNameIndex, classIndex)}}>delete</div>
        <style jsx>{`
          .out {
            display: flex;
            width: 400px;
          }
        `}</style>
      </div>
    })
    return arr

  }

  renderClassNamesCard (classNames) {
    let arr = classNames.map((className, classNameIndex) => {
      return (<div key={classNameIndex + classNameIndex} className='class-edit-div'>
        <div className='class-name'>
          <input onChange={(e) => {this.classNameChange(e, classNameIndex)}} value={className.name}/>
          <div onClick={() => {this.classNameAdd2(classNameIndex)}}>add</div>
          <div onClick={() => {this.classNameDelete2(classNameIndex)}}>delete</div>
        </div>
        {this.renderOneClass(className.styleArr, classNameIndex)}
        <div onClick={() => {this.classNameAdd(classNameIndex)}}>add</div>
        <style jsx>{`
          .class-name {
            width: 400px;
            border: 1px solid red;
            padding: 10px;
            display: flex;
            color: red;
            justify-content: space-between;
          }
        `}</style>
      </div>)
    })
    return arr
  }

  render () {
    let {classInfo} = this.props.node
    // 循环
    return <div>
      {this.renderClassNamesCard(classInfo)}
      <div onClick={() => {this.EditClassNameChange(this.props.currentClassJson, 'add3')}}>导入样式</div>
    </div>
  }
}