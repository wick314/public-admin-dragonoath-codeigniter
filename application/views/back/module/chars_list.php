<section class="content">
        <div class="container-fluid">
            <!-- Exportable Table -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                Danh Sách Nhân Vật
                            </h2>
                            <ul class="header-dropdown m-r--5">
                                <li class="dropdown">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul class="dropdown-menu pull-right">
                                        <!--
                                        <li><a href="#">Thêm Mới</a></li>
                                    -->
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="body">
                            <table class="table table-bordered table-striped table-hover dataTable js-exportable" id="chars_list">
                                <thead>
                                    <tr>
                                        <th>AID</th>
                                        <th>Account</th>
                                        <th>Character</th>
                                        <th>Cấp Độ</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>AID</th>
                                        <th>Account</th>
                                        <th>Character</th>
                                        <th>Cấp Độ</th>
                                        <th disable >Action</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Exportable Table -->
        </div>
    </section>

       <div class="modal modal-fullscreen fade" id="inomodal"   data-keyboard="false"  role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <ul class="nav nav-tabs" id="uinfotabs" role="tablist">
                                <li role="presentation" class="active">
                                    <a href="#tab_charinfo" data-toggle="tab">
                                        <i class="material-icons">face</i> THÔNG TIN NHÂN VẬT
                                    </a>
                                </li>  
                                <li role="presentation">
                                    <a href="#tab_accinfo" data-toggle="tab">
                                        <i class="material-icons">account_circle</i> THÔNG TIN TÀI KHOẢN
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#change_account" data-toggle="tab">
                                        <i class="material-icons">settings</i> THAY ĐỔI TÀI KHOẢN
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="modal-body">
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane fade in active" id="tab_charinfo">
                                   <div class="campain-input">
                                        <div class="row clearfix">
                                             <div class="col-md-5">
                                                <b>Nhân vật</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mcharname" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>Level</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mlevel" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-5">
                                                <b>Tài khoản</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control maccname" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <b>Danh hiệu</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mtitle" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>Kim nguyên bảo</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control myuanbao" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>Số Vàng Thương phố</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mbankmoney" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>Vmoney</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mvmoney" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>HP</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mhp" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>MP</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mmp" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>SEX</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control msex" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>STR</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mstr" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>SPR</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mspr" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>CON</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mcon" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>IPR</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mipr" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>DEX</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mdex" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>Points</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mpoints" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>Enegry</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control menegry" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                             <div class="col-md-2">
                                                <b>Max Enegry</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control menergymax" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <b>Guild Point</b>
                                                <div class="input-group">
                                                    <div class="form-line">
                                                        <input type="text" required="" class="form-control mguildpoint" disabled  >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="tab_accinfo">
                                        <div class="campain-input">
                                            <div class="row clearfix">
                                                <div class="col-md-2">
                                                    <b>#AccID</b>
                                                    <div class="input-group">
                                                        <div class="form-line">
                                                            <input type="text" required="" readonly name="inpcharid" class="form-control ino_accid">
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div class="col-md-10">
                                                    <b>Tài Khoản</b>
                                                    <div class="input-group">
                                                        <div class="form-line">
                                                            <input type="text" required="" readonly class="form-control ino_accname">
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div class="col-md-6">
                                                    <b>Email</b>
                                                    <div class="input-group">
                                                        <div class="form-line">
                                                            <input type="text" required="" readonly class="form-control ino_iemail">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <b>Pin</b>
                                                    <div class="input-group">
                                                        <div class="form-line">
                                                            <input type="text" required="" readonly class="form-control ino_ipin">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <b>Số Điện Thoại</b>
                                                    <div class="input-group">
                                                        <div class="form-line">
                                                            <input type="text" required="" readonly class="form-control ino_iphone">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <b>Câu Hỏi Bảo Mật</b>
                                                    <div class="input-group">
                                                        <div class="form-line">
                                                            <input type="text" required="" readonly class="form-control ino_chbm">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <b>Câu Trả Lời</b>
                                                    <div class="input-group">
                                                        <div class="form-line">
                                                            <input type="text" required="" readonly class="form-control ino_answer">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <b>Tổng Nạp thẻ</b>
                                                    <div class="input-group">
                                                        <div class="form-line">
                                                            <input type="text" required="" readonly class="form-control ino_score">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="change_account">
                                    <form action="Accounts/change_acc">
                                        <div class="campain-input">
                                            <div class="row clearfix">
                                                <div class="col-md-2">
                                                    <b>#AccID</b>
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="material-icons">title</i>
                                                        </span>
                                                        <div class="form-line">
                                                            <input type="text" required="" readonly name="inpcharid" class="form-control maid">
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div class="col-md-5">
                                                    <b>Nhân Vật</b>
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="material-icons">title</i>
                                                        </span>
                                                        <div class="form-line">
                                                            <input type="text" required="" id="charname" readonly name="charname" class="form-control mcharname">
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div class="col-md-5">
                                                    <b>Tài khoản</b>
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="material-icons">title</i>
                                                        </span>
                                                        <div class="form-line">
                                                            <input type="text" required="" id="oldacc" readonly name="oldacc" class="form-control maccname">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <b>Tài khoản mới</b>
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <i class="material-icons">title</i>
                                                        </span>
                                                        <div class="form-line">
                                                            <select class="form-control" id="inpnewacc" name="inpnewacc"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" id="btninomodal_sbm" class="btn btn-primary m-t-15 waves-effect"><i class="material-icons">mode_edit</i> Lưu </button>
                            <button type="button" class="btn btn-danger m-t-15 waves-effect" data-dismiss="modal"><i class="material-icons">close</i> Đóng</button>
                        </div>
                    </div>
                </div>
            </div>