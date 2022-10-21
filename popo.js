const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const prefix = "!";


client.once('ready', () => {
    console.log(`${client.user.tag}에 로그인하였습니다!`);
});

client.on('message', msg => {

    let msg_arr = msg.content.split(' ');
    let Command = new Discord.MessageEmbed();
    let info_arr = ['나이','생일','오버워치','발로란트','스팀'];

    if ( msg.author.bot || !msg.content.startsWith(prefix) )
    {
        return;
    }

    if ( msg_arr[0] == (prefix + "정보등록") && info_arr.includes(msg_arr[1]) && Boolean(msg_arr[2]) )
    {
        let temp = fs.readFileSync("user_data.txt");
        let user_data = temp.toString().split('\n');

        let userid = msg.author.id;
        let userNick = msg.author.username;
        //id/닉네임/나이/생일/오버워치닉/발로란트닉/스팀닉;

        let checked = [];
        let count = 0;

        for ( let i = 1; i < user_data.length; i++ )
        {
            if ( String(user_data[i]).includes(userid) )
            {
                checked = user_data[i];
                count = i;
                break;
            }
        }
        let embed = '';

        if ( Boolean(checked) && checked.length > 1 )
        {
            let temp_arr = checked.split('/');
            let idx = Number(info_arr.indexOf(msg_arr[1]))+2;

            temp_arr[idx] = msg_arr[2];

            let arrList = temp_arr.join('/');

            user_data[count] = arrList;

            let complite = user_data.join('\n');

            fs.writeFileSync("user_data.txt", complite, {encoding: 'utf8'});

            embed = Command.setTitle(':purple_heart: 알림 :purple_heart:')
            .setColor('#e3bdff')
            .setDescription(`${userNick}님의 정보수정이 정상적으로 완료되었습니다!`);
        }
        else
        {
            embed = Command.setTitle(':purple_heart: 알림 :purple_heart:')
            .setColor('#e3bdff')
            .setDescription(`정보 등록 전 !명령어 를 사용하여 갱신해주세요!`);
        }

        msg.reply(embed);

    }

    if ( msg_arr[0] == (prefix + "주사위") )
    {
        let dice = Math.ceil(Math.random()*6);
        let userNick = msg.author.username;

        let dice_img = '';

        switch(dice)
        {
            case 1:
                dice_img = 'https://cdn.discordapp.com/attachments/1024281970370412578/1033047796019888168/1.png';
                break;

            case 2:
                dice_img = 'https://cdn.discordapp.com/attachments/1024281970370412578/1033047796485476353/2.png';
                break;

            case 3:
                dice_img = 'https://cdn.discordapp.com/attachments/1024281970370412578/1033047796904886422/3.png';
                break;
                
            case 4:
                dice_img = 'https://cdn.discordapp.com/attachments/1024281970370412578/1033047797366280262/4.png';
                break;

            case 5:
                dice_img = 'https://cdn.discordapp.com/attachments/1024281970370412578/1033047797810864209/5.png';
                break;

            case 6:
                dice_img = 'https://cdn.discordapp.com/attachments/1024281970370412578/1033047798251262073/6.png';
                break;
        }

        let embed = Command.setTitle(':heart: 주사위 결과! :heart:')
        .setColor('#ff8573')
        .setDescription(`${userNick}님의 주사위 결과!`)
        .setThumbnail(dice_img);

        msg.reply(embed);

    }

    if ( msg_arr[0] == (prefix + "정보") && Boolean(msg_arr[1]) )
    { 
        let temp = fs.readFileSync("user_data.txt");
        let user_data = temp.toString();

        //id/닉네임/나이/생일/오버워치닉/발로란트닉/스팀닉;

        let checked = '';
        for ( const list of user_data.split('\n') )
        {
            if ( String(list).includes(msg_arr[1]) )
            {
                checked = list.split('/');
                //console.log(checked);
            }
        }

        let embed = '';

        if ( Boolean(checked[2]) )
        {
            embed = Command.setTitle(`:white_heart: ${msg_arr[1]}님의 정보 :white_heart:`)
            .setColor('#ffffff')
            .addFields(
            {name : `나이`, value : `${checked[2]}`},
            {name : `생일`, value : `${checked[3]}`},
            {name : `오버워치 닉네임`, value : `${checked[4]}`},
            {name : `발로란트 닉네임`, value : `${checked[5]}`},
            {name : `스팀 닉네임`, value : `${checked[6]}`},
            );
        }
        else
        {
            embed = Command.setTitle(`:white_heart: ${msg_arr[1]}님의 정보 :white_heart:`)
            .setColor('#ffffff')
            .setDescription('해당되는 유저를 찾을 수 없습니다!\n서버에 있지만 검색이 안되는 경우 !명령어 로 갱신해주세요!');
        }
        msg.reply(embed);
    }

    if ( msg_arr[0] == (prefix + "정보도움말") )
    { 
        //msg.reply("안녕하세요! "+msg.author.username+ '님!' )
        let embed = Command.setTitle(':purple_heart: 정보 도움말! :purple_heart:')
        .setColor('#e3bdff')
        .setDescription('[] << 괄호는 빼고 작성해 주시면 됩니다!!')
        .addFields(
        {name : `:one: !정보등록 나이 [숫자]`, value : '나이를 공개합니다! 비워두셔도 좋습니다!'},
        {name : `:two: !정보등록 생일 [x월x일]`, value : '생일을 공개합니다! 비워두셔도 좋습니다!'},
        {name : `:three: !정보등록 오버워치 [닉네임#배틀태그]`, value : '오버워치 닉네임을 공개합니다!'},
        {name : `:four: !정보등록 발로란트 [닉네임#태그]`, value : '발로란트 닉네임을 공개합니다!'},
        {name : `:five: !정보등록 스팀 [닉네임or친구코드]`, value : '스팀 닉네임을 공개합니다!'},
        );

        msg.reply(embed);
    }

    if (msg_arr[0] == (prefix + "명령어") )
    { 
        let temp = fs.readFileSync("user_data.txt");
        let user_data = temp.toString();

        let userid = msg.author.id;
        let userNick = msg.author.username;
        //id/닉네임/나이/생일/오버워치닉/발로란트닉/스팀닉;

        let checked = true;
        for ( const list of user_data.split('\n') )
        {
            if ( String(list).includes(userid) )
            {
                checked = false;
            }
        }

        if ( checked )
        {
            user_data += `\n${userid}/${userNick}/-/-/-/-/-`;
        }

        fs.writeFileSync("user_data.txt", user_data, {encoding: 'utf8'});

        let embed = Command.setTitle(':blue_heart: 포포서버 명령어 :blue_heart: ')
        .setColor('#c9f4ff')
        .setDescription(`안녕하세요! 저는 포포서버를 위해 태어났어요!\n제가 도와드릴 수 있는 명령어들을 알려드릴게요!!`)
        .addFields(
        {name : `:one: !소집 [할 말]`, value : 'everyone 태그로 사람들을 모집합니다\n할 말 부분에 내용을 적으시면 같이 등록됩니다.'},
        {name : `:two: !주사위`, value : '1~6 까지의 주사위를 굴립니다! 무엇이 나올까 두근두근'},
        {name : `:three: !정보 [아이디]`, value : '해당 인원의 정보를 봅니다!\n'},
        {name : `:four: !정보도움말`, value : '정보 작성을 위한 가이드 입니다 참고해주세요!'},
        {name : `:five: !정보등록 [정보 이름] [내용]`, value : '다른 사람들에게 공개할 자신의 정보를 작성합니다!\n정보에는 오버워치/발로란트/스팀닉네임 등 여러가지가 들어갑니다!'},
        );

        msg.reply(embed);
    }

    if (msg_arr[0] == (prefix + "소집"))
    {
        let embed = Command.setTitle(':yellow_heart: 포포서버 소집 :yellow_heart:')
        .setColor('#fff48f').setDescription(`@everyone ${msg.author.username}님이 소집하셨습니다!`)
        .setImage('https://cdn.discordapp.com/attachments/1024281970370412578/1033040762507632700/83b1af978ce10427.gif');
        // 소집 이미지 -> gif or 다른이미지로
        if (Boolean(msg_arr[1]))
        {
            msg_arr.shift();

            let moreMsg = msg_arr.join(' ');

            embed.addField(`${msg.author.username}님의 한마디`, moreMsg);
        }

        msg.channel.send(embed);
    }
});

client.on('guildMemberAdd', joinUser => {

    let welcomembed = new Discord.MessageEmbed()
    .setTitle(':yellow_heart: 환영합니다! :yellow_heart:')
    .setColor('#fff48f').setDescription(`${joinUser.user.username}님 안녕하세요! 포포서버에 오신걸 환영합니다!\n공지사항 확인해주시고 즐거운 하루 되세요~~ :10:`)
    .setThumbnail('');
    // 현식이가 보낸 썸넬 하나 넣기
    let channel_ID = joinUser.guild.systemChannelID;

    client.channels.cache.get(channel_ID).send(welcomembed);

});

client.login(process.env.TOKEN);