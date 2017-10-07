/**
 * Created by mak on 6/10/17.
 */
import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ListView,
    StatusBar,
    SectionList

} from 'react-native';
import {Ionicons, Entypo, MaterialCommunityIcons, Octicons, FontAwesome} from '@expo/vector-icons';
import axios from 'axios';
const {height, width} = Dimensions.get('window');
class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            refreshing: false,
            createdOn:'',
            labels: [{
                id: 1,
                title: 'All',
            },{
                id: 2,
                title: 'OverDue',
            },{
                id: 3,
                title: 'Closed',
            },{
                id: 4,
                title: 'New',
            },{
                id: 5,
                title: 'Today',
            },],
            page: 0,
            showLoader: false,
            endOfList: '',
            list:[{
                data:[],
                title:''
            },{                data:[],
                title:''
            },{                data:[],
                title:''
            }]
        };
        this.urlParam = '';
        this.id = 4;
    }

    filterList(id) {
        this.id=id;
    }

    componentWillMount() {

             axios.get('https://api.myjson.com/bins/i64i5')
                 .then(res=>{
                     const newObj = res.data.map((section, index) => {
                         return { data: section.taskList, title: section.createdOn, key: Math.random()}
                     })
                     this.setState({list: newObj, refreshing: false});
                     console.log(newObj[1]);
                 })
                 .catch(err=>{console.log('Error:' +err)});
    }



    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
        const labelStore = ds.cloneWithRows(this.state.labels, null);
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff',marginTop:24}}>
                <StatusBar  backgroundColor="#171c32" barStyle="light-content" />
                <View style={{display:'flex',flexDirection:'row',width:width,height:40,backgroundColor:'#323f6b'}}>
                    <View style={{display:'flex',flex:7,alignItems:'center',flexDirection:'row'}}>
                        <Ionicons name="ios-arrow-back" size={28} color="#fff"
                                  style={{paddingHorizontal: 20}}/>
                        <Text style={{fontSize:18,color:'white',paddingHorizontal:20,fontFamily:'Roboto-Regular'}}>Task List</Text>
                    </View>
                    <View style={{display:'flex',flex:1,justifyContent:'center'}}>
                        <Ionicons name="ios-search-outline" size={22} color="#fff"
                                  style={{paddingHorizontal: 8}}/>
                    </View>
                    <View style={{display:'flex',flex:1,justifyContent:'center'}}>
                        <FontAwesome name="sliders" size={22} color="#fff"
                                  style={{paddingHorizontal: 8}}/>
                    </View>

                    </View>
                <ListView
                    contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-between',maxHeight:55}}
                    dataSource={labelStore}
                    horizontal={true}
                    style={{maxHeight:55}}
                    showsHorizontalScrollIndicator={false}
                    renderRow={
                        (rowData) => <View>
                            <TouchableOpacity
                                ref={(component) => {
                                    this[rowData.id] = component
                                }}
                                style={styles.label}
                                onPress={() => {
                                    this.filterList(rowData.id)
                                }}
                            >


                                <Text style={[styles.labelText,{color:this.id===rowData.id?'white':'#cfcfcf'}]} >
                                    {rowData.title.toUpperCase()}
                                </Text>
                                <View style={{backgroundColor:this.id===rowData.id?'#39ace5':'#323f6b',borderRadius:5,height:5,width:5,top:5,alignSelf:'center'}}>
                                </View>

                            </TouchableOpacity>
                        </View>

                    }
                />
                <SectionList
                    contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                    style={{flex:1}}
                    // keyExtractor={(item, index) => Math.random()}
                    disableVirtualization={false}
                    sections={this.state.list}
                    renderSectionHeader={({section}) => <View style={{width:118,height:19,backgroundColor:'#fcf3e1',
                        alignSelf:'center', borderRadius:3,marginTop:16,
                        marginBottom:20,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#666666',fontSize:10,fontFamily:'Roboto-Light'}}>{section.title}</Text>
                    </View>}

                    renderItem={
                        ({item,index}) => <View style={[styles.tileContainer,{borderLeftColor:(index+1)%3!==0?((index+1)%2!==0?'#962d2d':'#7dc59f'):'#E8AE3A',borderLeftWidth:9}]}>
                            <TouchableOpacity style={styles.tile}
                                              onPress={()=>{}}
                            >

                                <View style={{flexDirection:'row',width:width-28,justifyContent:'space-between'}}>
                                    <Text style={styles.text}>
                                        {item.task}
                                    </Text>
                                    <Text style={styles.status}>
                                        {item.status.toUpperCase()}
                                    </Text>
                                </View>
                                <View style={{flexDirection:'row',width:width,paddingBottom:16}}>
                                    <Text style={styles.date}>
                                        Due Date
                                    </Text>

                                    <Text style={styles.category}>
                                        {item.dueDate}
                                    </Text>
                                    <Text style={styles.authorItalic}>
                                        {item.createdBy}
                                    </Text>
                                    <Text style={styles.category}>
                                        {item.category}
                                    </Text>

                                </View>
                            </TouchableOpacity>
                        </View>

                    }
                />
            </View>
        );
    }
}
const styles = {
    tileContainer: {
        flex:1,

    },
    tile: {
        width: width,
        flexDirection: 'column',
        paddingLeft: 26,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderRadius: 0,
        marginTop:-1,
        marginLeft:-1

    },
    image: {
        height: width / 1.75,
        borderWidth: 0,
        borderColor: '#1d87a7',
        width: width / 2.7,
        borderTopLeftRadius: 0,
        top: width/40,
        borderTopRightRadius: 0,
    },
    text: {
        textAlign: 'center',
        paddingTop: 5,
        marginTop:20,
        marginBottom:11,
        paddingHorizontal: 8,
        color: '#3e3e3e',
        fontSize:14,
        fontFamily:'Roboto-Regular',

    },
    date: {
        textAlign: 'center',
        paddingTop: 5,
        fontSize: 11,
        paddingHorizontal: 8,
        color: '#cfaoao',
        fontFamily:'Roboto-Light',

    },
    authorItalic: {
        textAlign: 'center',
        top: 5,
        fontSize: 11,
        paddingHorizontal: 8,
        color: '#8c8c8c',
        fontFamily:'Roboto-LightItalic',
        borderLeftWidth:1,
        borderLeftColor:'#8c8c8c',
        borderRightWidth:1,
        borderRightColor:'#8c8c8c',
        height:13,

    },
    category: {
        textAlign: 'center',
        paddingTop: 5,
        fontSize: 11,
        paddingHorizontal: 8,
        color: '#8c8c8c',
        fontFamily:'Roboto-Light',

    },
    status: {
        textAlign: 'center',
        paddingTop: 25,
        fontSize: 11,
        right:28,
        color: '#39ace5',
        fontFamily:'Roboto-Regular',

    },

    label: {
        backgroundColor: '#323f6b',
        minWidth: width / 5,
        padding: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelText: {
        color: '#cfcfcf',
        fontFamily:'Roboto-Light',
        fontSize:13
    },
};
export default TaskList;