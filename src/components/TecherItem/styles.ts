import{StyleSheet} from 'react-native';

const styles= StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e6e6f0',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
    },
    profile:{
        alignItems: 'center',
        padding: 24,
    },
    avatar:{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#eee',
    },
    profileInfo: {
        alignItems: 'center',
        marginLeft: 16,
    },
    name: {
        fontFamily: 'Archivo_700Bold',
        color:'#32264d',
        fontSize: 20,
    },
    subject: {
        fontFamily: 'Poppins_400Regular',
        color:'#6a6180',
        fontSize: 12,
        marginTop: 4,
    },
    bio:{
        marginHorizontal: 24,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 24,
        color:'#6a6180',
    },
    footer: {
        backgroundColor: '#fafafc',
        padding: 24,
        alignItems: 'center',
        marginTop: 24,
    },
    price:{
        fontFamily: 'Poppins_400Regular',
        color: '#6a6180',
        fontSize: 14,
    },
    priceValue: {
        fontFamily: 'Archivo_700Bold',
        color: '#8257e5',
        fontSize: 16,       
    },
    buttonsContainer:{
        flexDirection:'row',
        marginTop: 16,
    },
    favoriteButton:{
        width: 56,
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#8257e5', 
    },
    favorited:{
        backgroundColor: '#e33d3d',         
    },
    contactButton:{
        flex: 1,
        flexDirection: 'row',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#04d361', 
    },
    contactButtonText:{
        color: '#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        marginLeft: 16,
    },
});

export default styles;