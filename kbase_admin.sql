/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50631
Source Host           : 127.0.0.1:3306
Source Database       : kbase_admin

Target Server Type    : MYSQL
Target Server Version : 50631
File Encoding         : 65001

Date: 2017-12-13 08:44:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `anlidetails`
-- ----------------------------
DROP TABLE IF EXISTS `anlidetails`;
CREATE TABLE `anlidetails` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `AId` bigint(20) DEFAULT NULL COMMENT '案例类别表主键',
  `Title` varchar(200) DEFAULT NULL COMMENT '标题',
  `Content` varchar(5000) DEFAULT NULL COMMENT '内容',
  `CreateTime` datetime DEFAULT NULL COMMENT '创建时间',
  `OrderNum` int(11) DEFAULT NULL COMMENT '顺序',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='案例详情表';

-- ----------------------------
-- Records of anlidetails
-- ----------------------------
INSERT INTO `anlidetails` VALUES ('6', '4', '卫生部卫生政策决策支持项目（HPSP）知识管理系统', '<p>&nbsp;&nbsp;&nbsp; 为提高中国贫困人口健康状况，卫生部、英国国际发展署和世界卫生组织合作开展了卫生政策支持项目（HPSP）。 该项目主要关注的内容包括高质量的利贫政策的研究，快速对政策建议做出反应，有效的知识管理，证据和政策的传播，以及高级决策者 培训等。其中，由同方知网（北京）技术有限公司担任HPSP知识管理系统的建设工作。 HPSP知识管理系统分为知识整合、知识共享、信息交流平台、数据发布与共享、人力资源管理、门户及内容管理系统等6大子系统。 HPSP项目知识管理对现有证据进行有效收集、分析、综合和传播，以保证相关利贫卫生政策的制定是以知识或证据为基础。 这将是一个动态的过程，当证据从HPSP其他部分或其他地方出现时，通过知识管理系统，使各级卫生决策者能以合适方式及时地获得， 从而为决策和管理服务。通过对该系统的建设，通过该系统的建设，中国政府将逐步建立起一个高效、公平和高质量的卫生系统。</p>\r\n', '2016-04-06 13:34:39', null);

-- ----------------------------
-- Table structure for `anlitype`
-- ----------------------------
DROP TABLE IF EXISTS `anlitype`;
CREATE TABLE `anlitype` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `Name` varchar(100) DEFAULT NULL COMMENT '名称',
  `OrderNum` int(11) DEFAULT NULL COMMENT '顺序号',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='案例类别';

-- ----------------------------
-- Records of anlitype
-- ----------------------------
INSERT INTO `anlitype` VALUES ('4', '企业知识门户', '1');

-- ----------------------------
-- Table structure for `daohang`
-- ----------------------------
DROP TABLE IF EXISTS `daohang`;
CREATE TABLE `daohang` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `Name` varchar(200) DEFAULT NULL COMMENT '名称',
  `Url` varchar(200) DEFAULT NULL COMMENT '连接地址',
  `OrderNum` int(11) DEFAULT NULL COMMENT '顺序',
  `IsOut` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='导航';

-- ----------------------------
-- Records of daohang
-- ----------------------------
INSERT INTO `daohang` VALUES ('1', '首页', '/Kbase/index.html', '1', '0');
INSERT INTO `daohang` VALUES ('2', '产品介绍', '/Kbase/product.html', '2', '0');
INSERT INTO `daohang` VALUES ('3', '经典案例', '/Kbase/cases.html', '3', '0');
INSERT INTO `daohang` VALUES ('4', '软件下载', '/Kbase/download.html', '4', '0');
INSERT INTO `daohang` VALUES ('5', '技术支持', 'http://service.cnki.net/', '5', '1');
INSERT INTO `daohang` VALUES ('6', '常见问题', '/Kbase/question.html', '6', '0');
INSERT INTO `daohang` VALUES ('15', '问题反馈', '/Kbase/feedback.html', '7', '0');

-- ----------------------------
-- Table structure for `downfile`
-- ----------------------------
DROP TABLE IF EXISTS `downfile`;
CREATE TABLE `downfile` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `FileName` varchar(200) DEFAULT NULL COMMENT '文件名',
  `Version` varchar(100) DEFAULT NULL COMMENT '版本号',
  `FileSize` varchar(50) DEFAULT NULL COMMENT '文件大小',
  `FilePath` varchar(200) DEFAULT NULL COMMENT '文件路径',
  `UpDateTime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='文件路径表';

-- ----------------------------
-- Records of downfile
-- ----------------------------
INSERT INTO `downfile` VALUES ('1', 'KBase[V10.0 20130116]', null, null, '/Download/KBase.exe', '2013-09-10 00:00:00');

-- ----------------------------
-- Table structure for `fankui`
-- ----------------------------
DROP TABLE IF EXISTS `fankui`;
CREATE TABLE `fankui` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `Name` varchar(200) DEFAULT NULL COMMENT '联系人',
  `Phone` varchar(50) DEFAULT NULL COMMENT '手机',
  `QQ` varchar(50) DEFAULT NULL COMMENT 'QQ',
  `Email` varchar(200) DEFAULT NULL COMMENT '邮件',
  `Context` varchar(4000) DEFAULT NULL COMMENT '内容',
  `CreateTime` datetime DEFAULT NULL,
  `UpdateTime` datetime DEFAULT NULL,
  `Flag` smallint(6) DEFAULT '0' COMMENT '默认未处理0；已处理为1',
  `Remark` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='反馈表';

-- ----------------------------
-- Records of fankui
-- ----------------------------
INSERT INTO `fankui` VALUES ('23', '234324', '2132', '213213', '234324@qq.com', '13213213', '2016-04-13 17:22:22', '2016-04-13 17:22:22', '0', null);

-- ----------------------------
-- Table structure for `homeinfo`
-- ----------------------------
DROP TABLE IF EXISTS `homeinfo`;
CREATE TABLE `homeinfo` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `Title` varchar(200) DEFAULT NULL COMMENT '标题',
  `Content` varchar(4000) DEFAULT NULL COMMENT '内容',
  `OrderNum` int(11) DEFAULT NULL COMMENT '顺序号',
  `Url` varchar(200) DEFAULT NULL,
  `Class` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='首页说明表';

-- ----------------------------
-- Records of homeinfo
-- ----------------------------
INSERT INTO `homeinfo` VALUES ('5', 'KBase软件介绍', '<p>KBase知识库管理系统是清华同方知网（北京）技术有限公司（&ldquo;同方知网&rdquo;）拥有完全自主知识产权的，也是国际上第一个直接支持网格应用的专用数据库系统，对异构数据源提供统一访问和统一管理手段。</p>\r\n', '1', '/Kbase/product.html#productinfo', 'aboutus');

-- ----------------------------
-- Table structure for `image`
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Img` longblob NOT NULL,
  `ContentType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of image
-- ----------------------------

-- ----------------------------
-- Table structure for `loginlog`
-- ----------------------------
DROP TABLE IF EXISTS `loginlog`;
CREATE TABLE `loginlog` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `Uid` bigint(20) DEFAULT NULL COMMENT '用户表主键',
  `LogTime` datetime DEFAULT NULL COMMENT '登陆时间',
  `Ip` varchar(50) DEFAULT NULL COMMENT 'Ip地址',
  `Address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `waijian` (`Uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='登陆日志表';

-- ----------------------------
-- Records of loginlog
-- ----------------------------
INSERT INTO `loginlog` VALUES ('1', '1', '2017-12-13 08:41:15', '127.0.0.1', '本机地址');
INSERT INTO `loginlog` VALUES ('2', '8', '2017-12-13 08:42:48', '127.0.0.1', '本机地址');
INSERT INTO `loginlog` VALUES ('3', '3', '2017-12-13 08:43:19', '127.0.0.1', '本机地址');

-- ----------------------------
-- Table structure for `menue`
-- ----------------------------
DROP TABLE IF EXISTS `menue`;
CREATE TABLE `menue` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `Icon` varchar(200) DEFAULT NULL COMMENT '图标',
  `MenueName` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT '菜单名称',
  `Url` varchar(200) DEFAULT NULL COMMENT '连接地址',
  `ParentId` bigint(20) DEFAULT NULL COMMENT '父节点Id',
  `Level` smallint(6) DEFAULT NULL COMMENT '级别',
  `OrderNum` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1 COMMENT='菜单表';

-- ----------------------------
-- Records of menue
-- ----------------------------
INSERT INTO `menue` VALUES ('5', 'icon-menuehome', '导航菜单', null, '0', '0', null);
INSERT INTO `menue` VALUES ('14', 'icon-sys', '下载管理', null, '5', '1', '1');
INSERT INTO `menue` VALUES ('15', 'icon-set', '软件下载', '/Back/Download/Index', '14', '2', '1');
INSERT INTO `menue` VALUES ('20', 'icon-sys', '内容管理', null, '5', '1', '2');
INSERT INTO `menue` VALUES ('21', 'icon-set', '经典案例类别', '/Back/AnLiType/Index', '20', '2', '1');
INSERT INTO `menue` VALUES ('22', 'icon-set', '经典案例列表', '/Back/AnLi/Index', '20', '2', '2');
INSERT INTO `menue` VALUES ('23', 'icon-sys', '首页管理', null, '5', '1', '3');
INSERT INTO `menue` VALUES ('24', 'icon-set', '导航列表', '/Back/DaoHang/Index', '23', '2', '1');
INSERT INTO `menue` VALUES ('25', 'icon-set', '首页说明', '/Back/HomeInfo/Index', '23', '2', '2');
INSERT INTO `menue` VALUES ('26', 'icon-sys', '产品介绍管理', null, '5', '1', '5');
INSERT INTO `menue` VALUES ('27', 'icon-set', '产品介绍列表', '/Back/Product/Index', '26', '2', '1');
INSERT INTO `menue` VALUES ('28', 'icon-sys', '系统管理', null, '5', '1', '6');
INSERT INTO `menue` VALUES ('29', 'icon-set', '用户管理', '/Back/User/Index', '28', '2', '3');
INSERT INTO `menue` VALUES ('30', 'icon-set', '菜单资源权限管理', '/Back/Menue/Index', '28', '2', '1');
INSERT INTO `menue` VALUES ('31', 'icon-set', '系统日志', '/Back/UserLog/Index', '28', '2', '4');
INSERT INTO `menue` VALUES ('32', 'icon-set', '常见问题', '/Back/Question/Index', '20', '2', '3');
INSERT INTO `menue` VALUES ('33', 'icon-set', '问题反馈', '/Back/FanKui/Index', '20', '2', '4');
INSERT INTO `menue` VALUES ('34', 'icon-set', '角色管理', '/Back/Role/Index', '28', '2', '2');

-- ----------------------------
-- Table structure for `permission`
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `Mid` bigint(20) DEFAULT NULL COMMENT '菜单表主键',
  `Name` varchar(200) DEFAULT NULL COMMENT '权限名称',
  `SmallName` varchar(200) DEFAULT NULL COMMENT '权限简称',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COMMENT='页面权限表';

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('1', '22', '添加', 'Back.AnLi.Add');
INSERT INTO `permission` VALUES ('4', '22', '删除', 'Back.AnLi.Delete');
INSERT INTO `permission` VALUES ('5', '15', '添加', 'Back.Download.Add');
INSERT INTO `permission` VALUES ('6', '15', '删除', 'Back.Download.Delete');
INSERT INTO `permission` VALUES ('7', '15', '修改', 'Back.Download.Edit');
INSERT INTO `permission` VALUES ('8', '22', '修改', 'Back.AnLi.Edit');
INSERT INTO `permission` VALUES ('9', '21', '添加', 'Back.AnLiType.Add');
INSERT INTO `permission` VALUES ('10', '21', '删除', 'Back.AnLiType.Delete');
INSERT INTO `permission` VALUES ('11', '21', '编辑', 'Back.AnLiType.Edit');
INSERT INTO `permission` VALUES ('15', '32', '添加', 'Back.Question.Add');
INSERT INTO `permission` VALUES ('16', '32', '删除', 'Back.Question.Delete');
INSERT INTO `permission` VALUES ('17', '32', '修改', 'Back.Question.Edit');
INSERT INTO `permission` VALUES ('18', '33', '添加', 'Back.FanKui.Add');
INSERT INTO `permission` VALUES ('19', '33', '删除', 'Back.FanKui.Delete');
INSERT INTO `permission` VALUES ('20', '33', '修改', 'Back.FanKui.Edit');
INSERT INTO `permission` VALUES ('21', '24', '添加', 'Back.DaoHang.Add');
INSERT INTO `permission` VALUES ('22', '24', '删除', 'Back.DaoHang.Delete');
INSERT INTO `permission` VALUES ('23', '24', '修改', 'Back.DaoHang.Edit');
INSERT INTO `permission` VALUES ('24', '25', '添加', 'Back.HomeInfo.Add');
INSERT INTO `permission` VALUES ('25', '25', '删除', 'Back.HomeInfo.Delete');
INSERT INTO `permission` VALUES ('26', '25', '修改', 'Back.HomeInfo.Edit');
INSERT INTO `permission` VALUES ('27', '27', '添加', 'Back.Product.Add');
INSERT INTO `permission` VALUES ('28', '27', '删除', 'Back.Product.Delete');
INSERT INTO `permission` VALUES ('29', '27', '修改', 'Back.Product.Edit');
INSERT INTO `permission` VALUES ('33', '29', '添加', 'Back.User.Add');
INSERT INTO `permission` VALUES ('34', '29', '删除', 'Back.User.Delete');
INSERT INTO `permission` VALUES ('35', '29', '修改', 'Back.User.Edit');
INSERT INTO `permission` VALUES ('36', '30', '添加', 'Back.Menue.Add');
INSERT INTO `permission` VALUES ('37', '30', '删除', 'Back.Menue.Delete');
INSERT INTO `permission` VALUES ('38', '30', '修改', 'Back.Menue.Edit');
INSERT INTO `permission` VALUES ('51', '31', '添加', 'Back.UserLog.Add');
INSERT INTO `permission` VALUES ('52', '31', '删除', 'Back.UserLog.Delete');
INSERT INTO `permission` VALUES ('53', '31', '修改', 'Back.UserLog.Edit');
INSERT INTO `permission` VALUES ('54', '34', '添加', 'Back.Role.Add');
INSERT INTO `permission` VALUES ('55', '34', '删除', 'Back.Role.Delete');
INSERT INTO `permission` VALUES ('56', '34', '修改', 'Back.Role.Edit');
INSERT INTO `permission` VALUES ('57', '30', '执行模板', 'Back.Menue.Exec');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `Name` varchar(200) DEFAULT NULL COMMENT '角色名称',
  `Detail` varchar(200) DEFAULT NULL COMMENT '角色描述',
  `CreateTime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '超级管理员', '所有权限', '2016-04-22 09:08:29');
INSERT INTO `role` VALUES ('4', '管理员', '除了用户权限，拥有所有权限', '2016-04-22 09:37:55');
INSERT INTO `role` VALUES ('5', '独立的管理员', 'temp管理员', '2016-05-10 11:36:36');

-- ----------------------------
-- Table structure for `rolemenue`
-- ----------------------------
DROP TABLE IF EXISTS `rolemenue`;
CREATE TABLE `rolemenue` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `Rid` bigint(20) DEFAULT NULL COMMENT '角色表主键',
  `Mid` bigint(20) DEFAULT NULL COMMENT '菜单表主键',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8 COMMENT='角色菜单表';

-- ----------------------------
-- Records of rolemenue
-- ----------------------------
INSERT INTO `rolemenue` VALUES ('275', '1', '5');
INSERT INTO `rolemenue` VALUES ('276', '1', '14');
INSERT INTO `rolemenue` VALUES ('277', '1', '15');
INSERT INTO `rolemenue` VALUES ('278', '1', '20');
INSERT INTO `rolemenue` VALUES ('279', '1', '21');
INSERT INTO `rolemenue` VALUES ('280', '1', '22');
INSERT INTO `rolemenue` VALUES ('281', '1', '32');
INSERT INTO `rolemenue` VALUES ('282', '1', '33');
INSERT INTO `rolemenue` VALUES ('283', '1', '23');
INSERT INTO `rolemenue` VALUES ('284', '1', '24');
INSERT INTO `rolemenue` VALUES ('285', '1', '25');
INSERT INTO `rolemenue` VALUES ('286', '1', '26');
INSERT INTO `rolemenue` VALUES ('287', '1', '27');
INSERT INTO `rolemenue` VALUES ('288', '1', '28');
INSERT INTO `rolemenue` VALUES ('289', '1', '30');
INSERT INTO `rolemenue` VALUES ('290', '1', '34');
INSERT INTO `rolemenue` VALUES ('291', '1', '29');
INSERT INTO `rolemenue` VALUES ('292', '1', '31');
INSERT INTO `rolemenue` VALUES ('293', '4', '14');
INSERT INTO `rolemenue` VALUES ('294', '4', '15');
INSERT INTO `rolemenue` VALUES ('295', '4', '22');
INSERT INTO `rolemenue` VALUES ('296', '4', '5');
INSERT INTO `rolemenue` VALUES ('297', '4', '20');

-- ----------------------------
-- Table structure for `rolepermission`
-- ----------------------------
DROP TABLE IF EXISTS `rolepermission`;
CREATE TABLE `rolepermission` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `Rid` bigint(20) DEFAULT NULL COMMENT '角色表主键',
  `Pid` bigint(20) DEFAULT NULL COMMENT '权限表主键',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=734 DEFAULT CHARSET=utf8 COMMENT='角色权限表';

-- ----------------------------
-- Records of rolepermission
-- ----------------------------
INSERT INTO `rolepermission` VALUES ('691', '1', '1');
INSERT INTO `rolepermission` VALUES ('692', '1', '4');
INSERT INTO `rolepermission` VALUES ('693', '1', '5');
INSERT INTO `rolepermission` VALUES ('694', '1', '6');
INSERT INTO `rolepermission` VALUES ('695', '1', '7');
INSERT INTO `rolepermission` VALUES ('696', '1', '8');
INSERT INTO `rolepermission` VALUES ('697', '1', '9');
INSERT INTO `rolepermission` VALUES ('698', '1', '10');
INSERT INTO `rolepermission` VALUES ('699', '1', '11');
INSERT INTO `rolepermission` VALUES ('700', '1', '15');
INSERT INTO `rolepermission` VALUES ('701', '1', '16');
INSERT INTO `rolepermission` VALUES ('702', '1', '17');
INSERT INTO `rolepermission` VALUES ('703', '1', '18');
INSERT INTO `rolepermission` VALUES ('704', '1', '19');
INSERT INTO `rolepermission` VALUES ('705', '1', '20');
INSERT INTO `rolepermission` VALUES ('706', '1', '21');
INSERT INTO `rolepermission` VALUES ('707', '1', '22');
INSERT INTO `rolepermission` VALUES ('708', '1', '23');
INSERT INTO `rolepermission` VALUES ('709', '1', '24');
INSERT INTO `rolepermission` VALUES ('710', '1', '25');
INSERT INTO `rolepermission` VALUES ('711', '1', '26');
INSERT INTO `rolepermission` VALUES ('712', '1', '27');
INSERT INTO `rolepermission` VALUES ('713', '1', '28');
INSERT INTO `rolepermission` VALUES ('714', '1', '29');
INSERT INTO `rolepermission` VALUES ('715', '1', '33');
INSERT INTO `rolepermission` VALUES ('716', '1', '34');
INSERT INTO `rolepermission` VALUES ('717', '1', '35');
INSERT INTO `rolepermission` VALUES ('718', '1', '36');
INSERT INTO `rolepermission` VALUES ('719', '1', '37');
INSERT INTO `rolepermission` VALUES ('720', '1', '38');
INSERT INTO `rolepermission` VALUES ('721', '1', '51');
INSERT INTO `rolepermission` VALUES ('722', '1', '52');
INSERT INTO `rolepermission` VALUES ('723', '1', '53');
INSERT INTO `rolepermission` VALUES ('724', '1', '54');
INSERT INTO `rolepermission` VALUES ('725', '1', '55');
INSERT INTO `rolepermission` VALUES ('726', '1', '56');
INSERT INTO `rolepermission` VALUES ('727', '1', '57');
INSERT INTO `rolepermission` VALUES ('728', '4', '1');
INSERT INTO `rolepermission` VALUES ('729', '4', '4');
INSERT INTO `rolepermission` VALUES ('730', '4', '5');
INSERT INTO `rolepermission` VALUES ('731', '4', '6');
INSERT INTO `rolepermission` VALUES ('732', '4', '7');
INSERT INTO `rolepermission` VALUES ('733', '4', '8');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `LoginName` varchar(50) DEFAULT NULL COMMENT '用户名',
  `Pwd` varchar(50) DEFAULT NULL COMMENT '用户密码',
  `CreatTime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('3', 'admin', '123456', '2017-12-13 08:40:40');

-- ----------------------------
-- Table structure for `userrole`
-- ----------------------------
DROP TABLE IF EXISTS `userrole`;
CREATE TABLE `userrole` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `Uid` bigint(20) DEFAULT NULL COMMENT '用户表主键',
  `Rid` bigint(20) DEFAULT NULL COMMENT '角色表主键',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='人员角色表';

-- ----------------------------
-- Records of userrole
-- ----------------------------
INSERT INTO `userrole` VALUES ('20', '8', '5');
INSERT INTO `userrole` VALUES ('22', '3', '1');
INSERT INTO `userrole` VALUES ('23', '3', '4');

-- ----------------------------
-- View structure for `view_anlidetails`
-- ----------------------------
DROP VIEW IF EXISTS `view_anlidetails`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_anlidetails` AS select `a`.`Id` AS `Id`,`a`.`AId` AS `AId`,`a`.`Title` AS `Title`,`a`.`Content` AS `Content`,`a`.`CreateTime` AS `CreateTime`,`a`.`OrderNum` AS `OrderNum`,`b`.`Name` AS `Name` from (`anlidetails` `a` left join `anlitype` `b` on((`a`.`AId` = `b`.`Id`))) order by `a`.`Id` ;

-- ----------------------------
-- View structure for `view_loginlog`
-- ----------------------------
DROP VIEW IF EXISTS `view_loginlog`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_loginlog` AS select `a`.`Id` AS `Id`,`a`.`Uid` AS `Uid`,`a`.`LogTime` AS `LogTime`,`a`.`Ip` AS `Ip`,`b`.`LoginName` AS `LoginName` from (`loginlog` `a` left join `user` `b` on((`a`.`Uid` = `b`.`Id`))) ;

-- ----------------------------
-- View structure for `view_roleconcat`
-- ----------------------------
DROP VIEW IF EXISTS `view_roleconcat`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_roleconcat` AS select `a`.`Uid` AS `Uid`,group_concat(`b`.`Name` separator ',') AS `Name`,group_concat(`b`.`Id` separator ',') AS `Rid` from (`userrole` `a` left join `role` `b` on((`a`.`Rid` = `b`.`Id`))) group by `a`.`Uid` ;

-- ----------------------------
-- View structure for `view_rolemenue`
-- ----------------------------
DROP VIEW IF EXISTS `view_rolemenue`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_rolemenue` AS select `a`.`Id` AS `Id`,`a`.`Rid` AS `Rid`,`a`.`Mid` AS `Mid`,`b`.`Level` AS `Level` from (`rolemenue` `a` left join `menue` `b` on((`a`.`Mid` = `b`.`Id`))) ;

-- ----------------------------
-- View structure for `view_user`
-- ----------------------------
DROP VIEW IF EXISTS `view_user`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_user` AS select `a`.`Id` AS `Id`,`a`.`LoginName` AS `LoginName`,`a`.`Pwd` AS `Pwd`,`a`.`CreatTime` AS `CreatTime`,`b`.`Name` AS `Name`,`b`.`Rid` AS `Rid` from (`user` `a` left join `view_roleconcat` `b` on((`a`.`Id` = `b`.`Uid`))) ;

-- ----------------------------
-- View structure for `view_userrole`
-- ----------------------------
DROP VIEW IF EXISTS `view_userrole`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_userrole` AS select `a`.`Uid` AS `Uid`,`b`.`Name` AS `Name`,`a`.`Rid` AS `Rid`,`a`.`Id` AS `Id` from (`userrole` `a` left join `role` `b` on((`a`.`Rid` = `b`.`Id`))) ;

-- ----------------------------
-- Procedure structure for `sp_menue_delete`
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_menue_delete`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_menue_delete`(rootid bigint, inout back int)
BEGIN  
    DECLARE t_error INTEGER DEFAULT 0;  
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;  
        START TRANSACTION;  
        select @id:= GROUP_CONCAT(Id) from menue where FIND_IN_SET(Id,queryChildren(rootid)); 
SELECT @id;
        set @tou = 'delete from menue where id in (';
        set @wei = ')';
        set @last = concat(@tou,@id,@wei);    
        prepare temp from @last;               
        execute temp;                         
        deallocate prepare temp;              
        IF t_error = 1 THEN  
            set back=-1;
            ROLLBACK;  
        ELSE  
            set back=0;
            COMMIT;  
        END IF;  
 END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `queryChildren`
-- ----------------------------
DROP FUNCTION IF EXISTS `queryChildren`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `queryChildren`(areaId INT) RETURNS varchar(4000) CHARSET utf8
BEGIN
DECLARE sTemp VARCHAR(4000);
DECLARE sTempChd VARCHAR(4000);

SET sTemp = '$';
SET sTempChd = cast(areaId as char);

WHILE sTempChd is not NULL DO
SET sTemp = CONCAT(sTemp,',',sTempChd);
SELECT group_concat(id) INTO sTempChd FROM menue where FIND_IN_SET(parentId,sTempChd)>0;
END WHILE;
return sTemp;
END
;;
DELIMITER ;
