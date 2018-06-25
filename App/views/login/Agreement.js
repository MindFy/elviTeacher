import React, { Component } from 'react'
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import {
  common,
} from '../../constants/common'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import transfer from '../../localization/utils'

const styles = StyleSheet.create({
  headerLeft: {
    height: common.getH(40),
    width: common.getH(40),
    justifyContent: 'center',
  },
  headerLeftImage: {
    marginLeft: common.getH(10),
    width: common.getH(10),
    height: common.getH(20),
  },
  container: {
    flex: 1,
    backgroundColor: common.bgColor,
  },
  title: {
    marginLeft: common.getH(10),
    marginRight: common.getH(10),
    color: common.textColor,
    fontSize: common.font12,
    lineHeight: common.getH(18),
  },
  title2: {
    marginLeft: common.getH(30),
  },
  title3: {
    marginLeft: common.getH(50),
  },
  detail: {
    marginLeft: common.getH(30),
    marginRight: common.getH(10),
    color: common.textColor,
    fontSize: common.font10,
    lineHeight: common.getH(18),
  },
  detail2: {
    marginLeft: common.getH(50),
  },
  detail3: {
    marginLeft: common.getH(70),
  },
})

class Agreement extends Component {
  static navigationOptions(props) {
    let title = ''
    if (props.navigation.state.params) {
      title = props.navigation.state.params.title
    }
    return {
      headerTitle: title,
      headerLeft: (
        <NextTouchableOpacity
          style={styles.headerLeft}
          activeOpacity={common.activeOpacity}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={styles.headerLeftImage}
            source={require('../../assets/arrow_left_left.png')}
          />
        </NextTouchableOpacity>
      ),
    }
  }
  componentDidMount() {
    const { language, navigation } = this.props
    navigation.setParams({
      title: transfer(language, 'login_agreement'),
    })
  }

  render() {
    const { language } = this.props
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator
        removeClippedSubviews={false}
      >
        <Text style={[styles.title, { marginTop: common.getH(10) }]}>
          {`${transfer(language, 'agreement_1')} 
${transfer(language, 'agreement_2')} 
${transfer(language, 'agreement_3')} `}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_4')} 
${transfer(language, 'agreement_5')} 
${transfer(language, 'agreement_6')} 
${transfer(language, 'agreement_7')} `}
        </Text>
        <Text style={styles.title}>
          {`${transfer(language, 'agreement_8')} 
${transfer(language, 'agreement_9')} `}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_10')} 
${transfer(language, 'agreement_11')} 
${transfer(language, 'agreement_12')} 
${transfer(language, 'agreement_13')} 
${transfer(language, 'agreement_14')} 
${transfer(language, 'agreement_15')} 
${transfer(language, 'agreement_16')} `}
        </Text>
        <Text style={styles.title}>
          {`${transfer(language, 'agreement_17')} `}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_18')} 
${transfer(language, 'agreement_19')} 
${transfer(language, 'agreement_20')} 
${transfer(language, 'agreement_21')}
${transfer(language, 'agreement_22')}`}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {`
${transfer(language, 'agreement_23')}`}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {`
${transfer(language, 'agreement_24')}
${transfer(language, 'agreement_25')}
${transfer(language, 'agreement_26')}
${transfer(language, 'agreement_27')}
${transfer(language, 'agreement_28')}
${transfer(language, 'agreement_29')}
${transfer(language, 'agreement_30')}`}
        </Text>
        <Text style={styles.title}>
          {`${transfer(language, 'agreement_31')}
${transfer(language, 'agreement_32')}

${transfer(language, 'agreement_33')}`}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_34')}
${transfer(language, 'agreement_35')}
${transfer(language, 'agreement_36')}
${transfer(language, 'agreement_37')}`}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {`${transfer(language, 'agreement_38')}`}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {`${transfer(language, 'agreement_39')}
${transfer(language, 'agreement_40')}
${transfer(language, 'agreement_41')}
${transfer(language, 'agreement_42')}`}
        </Text>
        <Text style={styles.title}>
          {`${transfer(language, 'agreement_43')}
${transfer(language, 'agreement_44')}`}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {`${transfer(language, 'agreement_45')}`}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {`${transfer(language, 'agreement_46')}
${transfer(language, 'agreement_47')}
${transfer(language, 'agreement_48')}
${transfer(language, 'agreement_49')}`}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {`${transfer(language, 'agreement_50')}
${transfer(language, 'agreement_51')}`}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {`${transfer(language, 'agreement_52')}
${transfer(language, 'agreement_53')}
${transfer(language, 'agreement_54')}
${transfer(language, 'agreement_55')}
${transfer(language, 'agreement_56')}
${transfer(language, 'agreement_57')}
${transfer(language, 'agreement_58')}`}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {`${transfer(language, 'agreement_59')}`}
        </Text>
        <Text style={[styles.title, styles.title3]}>
          {`${transfer(language, 'agreement_60')}
${transfer(language, 'agreement_61')}`}
        </Text>
        <Text style={[styles.detail, styles.detail3]}>
          {`${transfer(language, 'agreement_62')}
${transfer(language, 'agreement_63')}
${transfer(language, 'agreement_64')}
${transfer(language, 'agreement_65')}
${transfer(language, 'agreement_66')}
${transfer(language, 'agreement_67')}
${transfer(language, 'agreement_68')}`}
        </Text>
        <Text style={styles.title}>
          {`${transfer(language, 'agreement_69')}`}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_70')}
${transfer(language, 'agreement_71')}
${transfer(language, 'agreement_72')}
${transfer(language, 'agreement_73')}
${transfer(language, 'agreement_74')}
${transfer(language, 'agreement_75')}
${transfer(language, 'agreement_76')}
${transfer(language, 'agreement_77')}
${transfer(language, 'agreement_78')}
${transfer(language, 'agreement_79')}`}
        </Text>
        <Text style={styles.title}>
          {`${transfer(language, 'agreement_80')}`}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_81')}
${transfer(language, 'agreement_82')}`}
        </Text>
        <Text style={styles.title}>
          {`${transfer(language, 'agreement_83')}
${transfer(language, 'agreement_84')}
${transfer(language, 'agreement_85')}`}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {transfer(language, 'agreement_86')}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {`${transfer(language, 'agreement_87')}
${transfer(language, 'agreement_88')}
${transfer(language, 'agreement_89')}
${transfer(language, 'agreement_90')}
${transfer(language, 'agreement_91')}
${transfer(language, 'agreement_92')}
${transfer(language, 'agreement_93')}
${transfer(language, 'agreement_94')}
${transfer(language, 'agreement_95')}
${transfer(language, 'agreement_96')}`}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {transfer(language, 'agreement_97')}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {`${transfer(language, 'agreement_98')}
${transfer(language, 'agreement_99')}
${transfer(language, 'agreement_100')}
${transfer(language, 'agreement_101')}
${transfer(language, 'agreement_102')}`}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_103')}
${transfer(language, 'agreement_104')}
${transfer(language, 'agreement_105')}
${transfer(language, 'agreement_106')}
${transfer(language, 'agreement_107')}
${transfer(language, 'agreement_108')}
${transfer(language, 'agreement_109')}`}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_110')}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_111')}
${transfer(language, 'agreement_112')}
${transfer(language, 'agreement_113')}
${transfer(language, 'agreement_114')}`}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_115')}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_116')}
${transfer(language, 'agreement_117')}
${transfer(language, 'agreement_118')}
${transfer(language, 'agreement_119')}
${transfer(language, 'agreement_120')}`}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_121')}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {transfer(language, 'agreement_122')}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {`${transfer(language, 'agreement_123')}
${transfer(language, 'agreement_124')}
${transfer(language, 'agreement_125')}
${transfer(language, 'agreement_126')}`}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {transfer(language, 'agreement_127')}
        </Text>
        <Text style={[styles.title, styles.title3]}>
          {transfer(language, 'agreement_128')}
        </Text>
        <Text style={[styles.detail, styles.detail3]}>
          {`${transfer(language, 'agreement_129')}
${transfer(language, 'agreement_130')}
${transfer(language, 'agreement_131')}
${transfer(language, 'agreement_133')}
${transfer(language, 'agreement_134')}
${transfer(language, 'agreement_135')}
${transfer(language, 'agreement_136')}
${transfer(language, 'agreement_137')} 
${transfer(language, 'agreement_138')}
${transfer(language, 'agreement_139')}`}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {transfer(language, 'agreement_140')}
        </Text>
        <Text style={styles.detail}>
          {transfer(language, 'agreement_141')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_142')}
        </Text>
        <Text style={styles.detail}>
          {transfer(language, 'agreement_143')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_144')}
        </Text>
        <Text style={styles.detail}>
          {transfer(language, 'agreement_145')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_146')}
        </Text>
        <Text style={styles.detail}>
          {transfer(language, 'agreement_147')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_148')}
        </Text>
        <Text style={styles.detail}>
          {transfer(language, 'agreement_149')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_150')}
        </Text>
        <Text style={styles.detail}>
          {transfer(language, 'agreement_151')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_152')}
        </Text>
        <Text style={styles.detail}>
          {transfer(language, 'agreement_153')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_154')}
        </Text>
        <Text style={styles.detail}>
          {transfer(language, 'agreement_155')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_156')}
        </Text>
        <Text style={styles.detail}>
          {transfer(language, 'agreement_157')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_158')}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_159')}
${transfer(language, 'agreement_160')}`}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_161')}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_162')}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_163')}
${transfer(language, 'agreement_164')}`}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_165')}
        </Text>
        <Text style={styles.detail}>
          {`${transfer(language, 'agreement_166')}
${transfer(language, 'agreement_167')}
${transfer(language, 'agreement_168')}
${transfer(language, 'agreement_169')}
${transfer(language, 'agreement_170')}
${transfer(language, 'agreement_171')}
${transfer(language, 'agreement_172')}
${transfer(language, 'agreement_173')}`}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_174')}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {transfer(language, 'agreement_175')}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {`${transfer(language, 'agreement_176')}
${transfer(language, 'agreement_177')}
${transfer(language, 'agreement_178')}
${transfer(language, 'agreement_179')}
${transfer(language, 'agreement_180')}
${transfer(language, 'agreement_181')}
${transfer(language, 'agreement_182')}
${transfer(language, 'agreement_183')}`}
        </Text>
        <Text style={[styles.title, styles.title2]}>
          {transfer(language, 'agreement_184')}
        </Text>
        <Text style={[styles.detail, styles.detail2]}>
          {`${transfer(language, 'agreement_185')}
${transfer(language, 'agreement_186')}
${transfer(language, 'agreement_187')}
${transfer(language, 'agreement_188')}`}
        </Text>
        <Text style={styles.title}>
          {transfer(language, 'agreement_189')}
        </Text>
        <Text style={[styles.detail, { marginBottom: common.getH(10) }]}>
          {`${transfer(language, 'agreement_190')}
${transfer(language, 'agreement_191')}
${transfer(language, 'agreement_192')}
${transfer(language, 'agreement_193')}`}
        </Text>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    language: state.system.language,
  }
}

export default connect(mapStateToProps)(Agreement)
